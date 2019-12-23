import * as functions from "firebase-functions";

import { LanguageServerClient } from "@google-cloud/language";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const webhook = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    // const payload = request.body;

    // if (payload.type === "url_verification") {
    //   response.status(200).json({ challenge: payload.challenge });
    // } else {
    //   if (payload.event && payload.event.type === "message") {
    //     console.log(payload.event);
    //     if (payload.event.user === functions.config().webhook.target_user_id) {
    //       console.log("TARGET USER: ", payload.event.user);
    //     } else {
    //       console.log("NON TARGET USER: ", payload.event.user);
    //     }
    //   }
    //   response.status(200).send("OK");
    // }
    await analyzeSentimentOfText("本日は晴天なり");
    response.status(200).send("OK");
  });

async function analyzeSentimentOfText(text: string) {
  const client = new LanguageServerClient();
  const document = {
    content: text,
    type: "PLAIN_TEXT"
  };

  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magunitude}`);
}
