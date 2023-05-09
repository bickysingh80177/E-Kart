const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    // service: process.env.SMPT_SERVICE,
    // auth: {
    //   user: process.env.SMPT_MAIL,
    //   pass: process.env.SMPT_PASSWORD,
    // },
    host: process.env.SMPT_SERVICE,
    port: process.env.SMPT_HOST,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
