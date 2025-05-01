import dotenv from "dotenv";
import TextLink from "textlink-sms";
dotenv.config();

TextLink.useKey(process.env.TELELINK_API_KEY);

// ✅ Proper function to send SMS
async function sendSMS(to, message) {
  try {
    const response = await TextLink.sendSMS(`+91${to}`, message);
    console.log("📩 SMS Response:", response);
  } catch (error) {
    console.error("❌ SMS Error:", error);
  }
}

export default sendSMS;
