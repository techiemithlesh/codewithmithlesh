const Notes = require("../models/Notes");

exports.createNote = async (noteData) => {
  try {
    const note = await Notes.create(noteData);
    return note;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
