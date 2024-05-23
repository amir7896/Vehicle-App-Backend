const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (recipient, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: recipient,
      subject: subject,
      html: html,
    });
    console.log(`Email send to recipient:${recipient}`);
  } catch (error) {
    console.log(`Error in sending email:${error}`);
  }
};

exports.sendEmails = (recipients, subject, html) => {
  sendEmail(recipients, subject, html);
};
