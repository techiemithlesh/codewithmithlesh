const notesServices = require("../services/Notes");
const uploadImage = require("./ImageUpload");

exports.createNote = async (req, res) => {
  try {
    let noteData = req.body;

    let imagePath = null;

    if (req.file) {
      const folderName = "notes";

      imagePath = await uploadImage(req, folderName);
    }

    const notes = {
      ...noteData,
      notes_img: imagePath,
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
