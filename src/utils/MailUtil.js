const mailer = require("nodemailer");

const mailSend = async (to, subject, text, attachments = []) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "patelvrutik8682@gmail.com",
      pass: "zfafrrxmqeqmyxzi",
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    to:to,
    from:"patelvrutik8682@gmail.com",
    subject:subject,
    //text:text
    html:`<h1>${text}</h1>`,
        attachments: attachments
  };

  await transport.sendMail(mailOptions)

};
module.exports = mailSend