const resend = require("resend");
const { Resend } = resend;
const dotenv = require("dotenv");

dotenv.config();

const resendInstance = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, htmlTemplate) => {
  try {
    const response = await resendInstance.emails.send({
      from: "Dividilo <onboarding@resend.dev>",
      to: email,
      subject,
      html: htmlTemplate,
    });
    return response;
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};
