import React, { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

const FaceDetector = ({ setUserFace, isImageCaptured, setIsImageCaptured }) => {
  const { colors } = useContext(ThemeContext);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [faceScore, setFaceScore] = useState(0);
  const intervalRef = useRef(null); // store interval for cleanup

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setIsModelsLoaded(true);
    };
    loadModels();
  }, []);

  // Start video stream
  useEffect(() => {
    let stream;
    const startVideo = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    if (isModelsLoaded) {
      startVideo();
    }

    // Cleanup when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(intervalRef.current);
    };
  }, [isModelsLoaded]);

  // Start detecting faces
  const handleVideoOnPlay = () => {
    intervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || video.readyState !== 4 || !canvas) return;

      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) return;

      setFaceScore(detection.detection.score);

      const context = canvas.getContext("2d");
      if (!context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (detection.detection.score > 0.79 && !isImageCaptured) {
        await new Promise(resolve => setTimeout(resolve, 100));

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setUserFace(imageData);
        setIsImageCaptured(true);
        console.log("✅ Face Captured");

        // Stop webcam and interval
        if (video.srcObject) {
          video.srcObject.getTracks().forEach((track) => track.stop());
          video.srcObject = null;
        }
        clearInterval(intervalRef.current);
      }
    }, 100);
  };

  return (
    <div
      className="w-screen h-screen fixed z-20"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 300,
          height: 300,
          borderRadius: "50%",
          overflow: "hidden",
          border: faceScore > 0.79 ? "8px solid green" : "8px solid gray",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          mx: "auto",
          mt: 4,
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoOnPlay}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Hidden Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            visibility: "hidden", // Hide blue lines or canvas
          }}
        />
      </Box>
    </div>
  );
};

export default FaceDetector;
