const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.helloWorld = functions
  .region("asia-east1")
  .https.onRequest((req, res) => {
    cors(req, res, () => {
      return res.json({ status: "ok121" });
    });
  });
