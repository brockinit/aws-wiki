const serverless = require("serverless-http");
const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

<<<<<<< HEAD
app.delete("/documentation/:pageId/notes/:noteId", (req, res) => {
  const { pageId, noteId } = req.params;
  const query = "DELETE FROM notes WHERE page_id = $1 AND id = $2";
  const values = [pageId, noteId];

=======
app.get("/documentation/:pageId/notes", function(req, res) {
  const query = "SELECT * FROM notes WHERE page_id = $1";
  const pageId = req.params.pageId;
  const values = [pageId];

  if (!pageId) {
    return res.status(400).json({ error: "Page Id required in the request" });
  }
>>>>>>> master
  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
<<<<<<< HEAD
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
=======
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
>>>>>>> master
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
