/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const cors = require("cors")({ origin: true });
//const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const TINYMCE_API_KEY = defineSecret("TINYMCE_API_KEY");
const FB_API_KEY = defineSecret("FB_API_KEY");

exports.getKeys = onRequest(
    { secrets: [TINYMCE_API_KEY, FB_API_KEY] },
    (request, response) => {
        cors(request, response, () => {
            response.json({
                TINYMCE_API_KEY: TINYMCE_API_KEY.value() || "Nenalezeno",
                FB_API_KEY: FB_API_KEY.value() || "Nenalezeno"
            });
        });
    }
);