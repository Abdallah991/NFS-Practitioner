import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();
const db = admin.firestore();
sgMail.setApiKey(
  "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"
);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
