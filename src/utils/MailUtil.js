const mailer = require("nodemailer");

const mailSend = async (to, subject, text) => {
  const transport = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "patelvrutik8682@gmail.com",
      pass: "zfafrrxmqeqmyxzi",
    },
  });
  const mailOptions = {
    to:to,
    from:"patelvrutik8682@gmail.com",
    subject:subject,
    //text:text
    html:`<h1>${text}</h1>`
  };

  await transport.sendMail(mailOptions)

};
module.exports = mailSend