const agentWelcomeTemplate = ({ name }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Welcome to the Swift-Bite Team, ${name}!</h2>
        <p>We're thrilled to have you join our network of delivery agents.</p>
        <p>Your account has been successfully created. You can now log in to the Agent Panel to view and accept available delivery jobs in your area.</p>
        <p>Thank you for helping us deliver delicious meals to our customers.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>The Swift-Bite Team</strong></p>
    </div>
    `;
};

// Ensure this is a default export
export default agentWelcomeTemplate;