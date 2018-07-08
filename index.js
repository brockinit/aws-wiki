const serverless = require("serverless-http");
const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/documentation/:pageId/notes", function(req, res) {
  const query = "SELECT * FROM notes WHERE page_id = $1";
  const pageId = req.params.pageId;
  const values = [pageId];

  if (!pageId) {
    return res.status(400).json({ error: "Page Id required in the request" });
  }
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: result.rows });
  });
});

app.get("/documentation/:pageId/notes/:noteId", function(req, res) {
  const query = "SELECT * FROM notes WHERE page_id = $1 AND id = $2";
  const pageId = req.params.pageId;
  const noteId = req.params.noteId;
  const values = [pageId, noteId];

  if (!pageId || !noteId) {
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
