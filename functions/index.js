/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
sgMail.setApiKey("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"); // 🔁 встав сюди свій ключ

exports.sendWelcomeEmail = functions.firestore
  .document("subscribers/{subscriberId}")
  .onCreate((snap) => {
    const { email } = snap.data();

    const msg = {
      to: email,
      from: "lsemsichko@gmail.com", // 🔁 заміни на свій зареєстрований в SendGrid email
      subject: "Вітаємо на сайті!",
      text: "Привіт, дякуємо за підписку на наші новини!",
    };

    return sgMail.send(msg);
  });

