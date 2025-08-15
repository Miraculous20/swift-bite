const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Welcome to Swift-Bite!</h2>
        <p>Dear ${name},</p>    
        <p>Thank you for registering. Please click the button below to verify your email address and activate your account.</p>   
        <a href="${url}" style="color: white; background-color: #28a745; margin: 20px 0; padding: 15px 30px; display: inline-block; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
        </a>
        <p>If you did not create an account, you can safely ignore this email.</p>
        <br/>
        <p>Thanks,</p>
        <p><strong>The Swift-Bite Team</strong></p>
    </div>
    `;
};

export default verifyEmailTemplate;