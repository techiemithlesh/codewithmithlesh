const { request } = require("express");
const Notes = require("../models/Notes");
const notesServices = require("../services/Notes");
const uploadImage = require("./ImageUpload");
const path = require("path");
const fs = require("fs");
const sequelize = require("../db/dbconfig");

exports.createNote = async (req, res) => {
  try {
    let noteData = req.body;

    let imagePath = null;
    let filePath = null;

    if (req.files && req.files.notes_img && req.files.notes_img[0]) {
      const folderName = "notes";
      imagePath = await uploadImage(req.files.notes_img[0], folderName);
    }

    // Check if `notes_file` file exists in `req.files`
    if (req.files && req.files.notes_file && req.files.notes_file[0]) {
      const folderName = "notes/pdf";
      filePath = await uploadImage(req.files.notes_file[0], folderName);
    }

    // return res.status(201).json({ note: noteData });

    const notes = {
      ...noteData,
      notes_img: imagePath,
      notes_file: filePath,
    };

    const note = await notesServices.createNote(notes);

    if (!note) {
      return res.status(400).json({ message: "Error Creating note!" });
    }

    return res.status(201).json({
      message: "Notes Created Successfully!",
      notes: note,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Validation Error",
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

// NOTES LIST
exports.getNotesAll = async (req, res) => {
  try {
    const all = await notesServices.getAllNotes();
    // console.log("List", list);
    return res.status(200).json({
      status: true,
      message: "All Notes List",
      notes: all,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error,
    });
  }
};

exports.getNotesById = async (req, res) => {
  try {
    let id = req.params.id;

    const note = await Notes.findByPk(id);

    return res.status(200).json({
      message: "Notes Fetched Successfully !",
      note: note,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const noteData = req.body;

    const existingNote = await Notes.findByPk(id);

    if (!existingNote) {
      return res.status(404).json({ message: "Note doesn't exist!" });
    }

    // Handle `notes_img` upload and deletion of old image
    if (req.files && req.files.notes_img && req.files.notes_img[0]) {
      const oldNoteImgPath = path.join(
        __dirname,
        "..",
        "public",
        existingNote.notes_img
      );

      if (fs.existsSync(oldNoteImgPath)) {
        fs.unlinkSync(oldNoteImgPath);
      }
      const folderName = "notes";
      noteData.notes_img = await uploadImage(
        req.files.notes_img[0],
        folderName
      );
    }

    // Handle `notes_file` upload and deletion of old file
    if (req.files && req.files.notes_file && req.files.notes_file[0]) {
      const oldNoteDocPath = path.join(
        __dirname,
        "..",
        "public",
        existingNote.notes_file
      );

      if (fs.existsSync(oldNoteDocPath)) {
        fs.unlinkSync(oldNoteDocPath);
      }
      const folderName = "notes/pdf";
      noteData.notes_file = await uploadImage(
        req.files.notes_file[0],
        folderName
      );
    }

    // Update the note
    const [updated] = await Notes.update(noteData, { where: { id } });

    if (updated) {
      const updatedNote = await Notes.findByPk(id);
      return res.status(200).json({
        message: "Note updated successfully!",
        note: updatedNote,
      });
    } else {
      return res.status(400).json({ message: "No changes made!" });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    } else if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        error: "Validation Error",
        message: error.errors[0].message,
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

exports.deletNotes = async (req, res) => {
  try {
    let id = req.params.id;

    const existingNotes = await Notes.findByPk(id);

    if (!existingNotes) {
      return res
        .status(404)
        .send({ message: "Notes Doesn't exist of given id !" });
    }

    const oldNoteImgPath = path.join(
      __dirname,
      "..",
      "public",
      existingNotes.notes_img
    );

    if (fs.existsSync(oldNoteImgPath)) {
      fs.unlinkSync(oldNoteImgPath);
    }

    const oldNotesDocPath = path.join(
      __dirname,
      "..",
      "public",
      existingNotes.notes_file
    );

    if (fs.existsSync(oldNotesDocPath)) {
      fs.unlinkSync(oldNotesDocPath);
    }

    return res.status(200).send({ message: "Notes Deleted Successfully !" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
