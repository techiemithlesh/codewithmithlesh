const express = require("express");
const notesController = require("../controller/NotesController");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "tmp/" });

// router.post("/create", upload.single("notes_img"), notesController.createNote);
router.post(
  "/create",
  upload.fields([
    { name: "notes_img", maxCount: 1 },
    { name: "notes_file", maxCount: 1 },
  ]),
  notesController.createNote
);
router.get("/list", notesController.getNotesAll);

module.exports = router;
