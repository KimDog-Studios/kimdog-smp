const emailConfig = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
    from: `"KimDog SMP" <${process.env.EMAIL_USER}>`,
  };
  
  export default emailConfig;