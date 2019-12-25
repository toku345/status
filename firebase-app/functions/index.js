const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.webhook = functions
  .region("asia-northeast1")
  .https.onRequest(async (request, response) => {
    const payload = request.body;

    if (payload.type === "url_verification") {
      response.status(200).json({ challenge: payload.challenge });
    } else {
      if (payload.event && payload.event.type === "message") {
        if (payload.event.user === functions.config().webhook.target_user_id) {
          console.log(payload.event);
          const sentiment = await analyzeSentimentOfText(payload.event.text);
          saveSentimentScore(payload.event.text, sentiment, payload.event.ts);
        } else {
          // Do nothing
        }
      }
      response.status(200).send("OK");
    }
  });

async function analyzeSentimentOfText(text) {
  const language = require("@google-cloud/language");
  const client = new language.LanguageServiceClient();
  const document = {
    content: text,
    type: "PLAIN_TEXT"
  };

  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  return sentiment;
}

function saveSentimentScore(text, sentiment, ts) {
  let db = admin.firestore();
  db.collection("sentiment-scores").add({
    tweet: text,
    score: sentiment.score,
    magnitude: sentiment.magnitude,
    postedAt: ts
  });
}
