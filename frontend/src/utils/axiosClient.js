import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
});

// const testConnection = async () => {
//   try {
//     const res = await axiosClient.get("/");
//     console.log("✅ Server response:", res.data);
//   } catch (error) {
//     console.error("❌ Error from backend:", error.response?.data || error.message);
//   }
// };

export default axiosClient;
