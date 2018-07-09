const serverless = require("serverless-http");
const express = require("express");
const crypto = require("crypto");
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.delete("/documentation/:pageId/notes/:noteId", (req, res) => {
  const { pageId, noteId } = req.params;
  const query = "DELETE FROM notes WHERE page_id = $1 AND id = $2";
  const values = [pageId, noteId];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(204).json({});
  });
});

app.put("/documentation/:pageId/notes/:noteId", (req, res) => {
  const { pageElement, noteBody } = req.body;
  if (!pageElement || !noteBody) {
    return res.status(400).json({ error: "Missing required parameters pageElement and noteBody" });
  }
  const query = "UPDATE notes SET page_id = $1, page_element = $2, note_body = $3";
  const pageId = req.params.pageId;
  const values = [pageId, pageElement, noteBody];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ page_id: pageId, page_element: pageElement, note_body: noteBody });
  });
});

app.post("/documentation/:pageId/notes", (req, res) => {
  const { pageElement, noteBody } = req.body;
  if (!pageElement || !noteBody) {
    return res.status(400).json({ error: "Missing required parameters pageElement and noteBody" });
  }
  const query = "INSERT INTO notes (page_id, page_element, note_body) VALUES($1, $2, $3)";
  const pageId = req.params.pageId;
  const values = [pageId, pageElement, noteBody];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ page_id: pageId, page_element: pageElement, note_body: noteBody });
  });
});

app.get("/documentation/:pageId/notes", (req, res) => {
  const query = "SELECT * FROM notes WHERE page_id = $1";
  const pageId = req.params.pageId;
  const values = [pageId];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(result.rows);
  });
});

app.get("/documentation/:pageId/notes/:noteId", (req, res) => {
  const query = "SELECT * FROM notes WHERE id = $1";
  const pageId = req.params.pageId;
  const values = [pageId];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const note = result.rows[0];
    return res.json({ note });
  });
});

module.exports.handler = serverless(app);
