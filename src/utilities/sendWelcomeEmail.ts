export const sendWelcomeEmail = async ({ operation, doc, req }) => {
  if (operation === 'create') {
    const email = doc["email"];
    const first_name = doc["first-name"];

    await req.payload.sendEmail({
      to: email,
      subject: "Welcome to Himati!",
      html: `
        <div class="container">
          <h3>Hello, ${first_name}!</h3>
          <p>Welcome to <strong>Himati CMS</strong>!</p>
          <p>An account has been created for you using this email address. This will grant you access to our content management system (CMS), where you can manage and collaborate on projects seamlessly.</p>
          <p>To get started, please contact the Himati CMS support team to receive your password and complete your account setup.</p>
          <p>If you have any questions, feel free to reach out to us. We're here to help!</p>
          <p>Best regards,<br><strong>The Himati Team</strong></p>
          <div class="footer">
            <br>
            <p><i>If you didn’t expect this email, please disregard it or contact support for assistance.</i></p>
          </div>
        </div>
      `
    });
  }
}
