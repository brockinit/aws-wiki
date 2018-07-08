const serverless = require("serverless-http");
const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/documentation/:pageId/notes", function(req, res) {
  const query = "SELECT * FROM notes WHERE page_id = $1";
  const page_id = req.params.pageId;
  const values = [page_id];

  if (!page_id) {
    return res.status(400).json({ error: "Page Id required in the request" });
  }
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: result.rows });
  });
});

module.exports.handler = serverless(app);
