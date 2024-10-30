const notesServices = require("../services/Notes");
const uploadImage = require("./ImageUpload");

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
