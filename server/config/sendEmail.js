import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API);
const FROM_EMAIL = process.env.FROM_EMAIL  || 'Swift-Bite <noreply@swiftbite1@gmail.com>';

const sendEmail = async ({ sendTo, subject, html }) => {
  if (!sendTo || !subject || !html) {
    throw new Error("Missing required email parameters: to, subject, or html.");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: sendTo,
      subject,
      html,
    });

    if (error) {
      console.error({ error });
      throw new Error("Email sending failed.");
    }

    return data;
  } catch (error) {
    console.error("Email service error:", error.message);
    throw error;
  }
};

export default sendEmail;