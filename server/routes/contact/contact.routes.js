const express = require("express");
const contactRoutes = express.Router();
const transporter = require("../../config/nodeMailer.config");
require("dotenv").config({ path: "../../../.env" });

contactRoutes.get("/", (req, res) => {
  res.render("layouts/contact", {
    title: "Contactez-nous.",
    message: "",
  });
});

contactRoutes.post("/", async (req, res) => {
  const { email, username, objet, message } = req.body;

  if (!email || !username || !objet || !message) {
    return res.status(404).send("Fill all input please");
  }

  const mailOptions = {
    from: email,
    replyTo: email,
    to: "contact.cinephoria@gmail.com",
    subject: objet,
    text: `Ce mail vous a été envoyé par ${username} (${email}): ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render("layouts/contact", {
      title: "Contactez-nous",
      message: "Votre message a été envoyé avec succès.",
    });
  } catch (err) {
    console.log("Error while sending email", err);
    res.render("layouts/contact", {
      title: "Contactez-nous",
      message:
        "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer plus tard.",
    });
  }
});

module.exports = contactRoutes;
