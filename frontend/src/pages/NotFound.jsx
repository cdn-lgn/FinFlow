import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
        >
          <Typography variant="h1" color="primary" fontWeight="bold">
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Typography variant="h5" mt={2} mb={2}>
            Oops! Page not found 😢
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#007BFF",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            Go to Home
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default NotFound;
