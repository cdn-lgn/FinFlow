import dotenv from "dotenv";
import TextLink from "textlink-sms";
dotenv.config();

TextLink.useKey(process.env.TELELINK_API_KEY||"5pyin3cuGDcKDuLJ9CemVhh2aP8N61p50O8ehOYjuVJvx76aWOMsnDHJsbLEvVNh");

// ✅ Proper function to send SMS
async function sendSMS(to, message) {
  try {
    const response = await TextLink.sendSMS(to, message);
    console.log("📩 SMS Response:", response);
  } catch (error) {
    console.error("❌ SMS Error:", error);
  }
}

export default sendSMS
