const eateryWelcomeTemplate = ({ adminName, eateryName }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Welcome to Swift-Bite, ${eateryName}!</h2>
        <p>Dear ${adminName},</p>
        <p>Congratulations! Your eatery, <strong>${eateryName}</strong>, and your administrator account have been successfully registered on the Swift-Bite platform.</p>
        <p>You can now log in to your Eatery Dashboard to manage your menu, track incoming orders, and view your business analytics.</p>
        <p>We are excited to partner with you to bring your delicious food to customers across the city.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>The Swift-Bite Team</strong></p>
    </div>
    `;
};

export default eateryWelcomeTemplate;