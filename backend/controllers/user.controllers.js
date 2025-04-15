import imageKit from "../config/imagekit.js";

export async function userRegistration(req, res) {
  try {
    const image = req.file;

    const uploadPhoto = await imageKit.upload({
      file: image.buffer,
      fileName: `${Date.now()}_${req.fullName}`,
      folder: "finflow/userProfile",
    });

    res.status(200).json({
      success: true,
      message: "✅ User Registration Successful",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "User Registration Failed",
      error: error.message,
    });
  }
}
