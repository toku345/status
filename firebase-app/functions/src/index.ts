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
        if (payload.event.user === functions.config().webhook.target_user_id) {
          console.log("TARGET USER: ", payload.event.user);
        } else {
          console.log("NON TARGET USER: ", payload.event.user);
        }
      }
      response.status(200).send("OK");
    }
  });
