const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Dear ${name},</p>
        <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to complete the process. This code is valid for 1 hour.</p>
        <div style="background: #f0f0f0; font-size: 24px; padding: 20px; text-align: center; font-weight: bold; letter-spacing: 5px; margin: 20px 0; border-radius: 5px;">
            ${otp}
        </div>
        <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
        <br/>
        <p>Thanks,</p>
        <p><strong>The Swift-Bite Team</strong></p>
    </div>
    `;
};

export default forgotPasswordTemplate;