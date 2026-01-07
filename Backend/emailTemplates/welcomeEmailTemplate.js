export const welcomeEmailTemplate = ({ name, mobile }) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Welcome, ${name}! 🎉</h2>
      <p>Your account has been successfully created.</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <br/>
      <p>Thanks for choosing Real-Estate.</p>
      <p>— Team Real-Estate</p>
    </div>
  `;
};
