import React, { useContext, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { ThemeContext } from "../../context/ThemeContext";

const FaceDetector = ({ setUserFace, isImageCaptured, setIsImageCaptured }) => {
  const { colors } = useContext(ThemeContext);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [faceScore, setFaceScore] = useState(0);
  const intervalRef = useRef(null);

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

    if (isModelsLoaded) startVideo();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      clearInterval(intervalRef.current);
    };
  }, [isModelsLoaded]);

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
        await new Promise((resolve) => setTimeout(resolve, 100));
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setUserFace(imageData);
        setIsImageCaptured(true);
        console.log("✅ Face Captured");

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
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center"
      style={{ color: colors.text }}
    >
      <div
        className={`relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-lg border-[8px] ${
          faceScore > 0.79 ? "border-green-500" : "border-gray-400"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoOnPlay}
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full invisible"
        />
      </div>
    </div>
  );
};

export default FaceDetector;
