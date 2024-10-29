const express = require("express");
const notesController = require("../controller/NotesController");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "tmp/" });

router.post("/create", upload.single("notes_img"), notesController.createNote);

module.exports = router;
