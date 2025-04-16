import sendMail from "./sendEmail.js";
import sendSMS from "./sendSMS.js";

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

async function sendOTP(email, number)  {
  const OTP = generateOTP();
  await sendMail(
    email,
    "Verification OTP",
    "FinFlow Bank",
    `<p>your verification OTP  for your FinFlow Bank Account is ${OTP}</p>`
  );
  await sendSMS(
    `+91${number}`,
    `your verification OTP  for your FinFlow Bank Account is ${OTP}`
  );
  return {
    success: true,
    message: "OTP sent successfully",
    otp:OTP
  };
};
// sendOTP("logan2246t@gmail.com",9399557857)
export default sendOTP;
