require("dotenv").config({ path: "../../.env" });
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact.cinephoria@gmail.com",
    pass: "tslm weil xxeg kbum",
  },
});

module.exports = transporter;
