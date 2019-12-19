import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const webhook = functions
  .region("asia-northeast1")
  .https.onRequest((request, response) => {
    const payload = request.body;

    if (payload.type === "url_verification") {
      response.status(200).json({ challenge: payload.challenge });
    } else {
      if (payload.event && payload.event.type === "message") {
        console.log(payload.event);
      }
      response.status(200).send("OK");
    }
  });
