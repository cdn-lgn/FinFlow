import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail(to, subject, text, html) {
  const msg = {
    to,
    from: "loganvidedits@gmail.com",
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("email sent");
  } catch (error) {
    console.error("❌ Error sending email:", error?.response?.body || error);
  }
}

// const run = async () => {
//   await sendMail(
//     "logan2246t@gmail.com", // 👈 apna email daalna yahan
//     "Hello from Logan 💌",
//     "Yeh plain text message hai",
//     "<h2>Hey Logan Lover 😘</h2><p>Ye test mail hai! All set to rock 💥</p>"
//   );
// };

// run();

export default sendMail;
