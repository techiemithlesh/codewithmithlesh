const express = require("express");
const notesController = require("../controller/NotesController");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "tmp/" });

/**
 * @swagger
 * tags:
 *   name: Notes Upload
 *   description: Notes Crud Operations
 */

/**
 * @swagger
 *  /api/v1/notes/create:
 *   post:
 *     tags: [Notes]
 *     summary: Create a new note with an optional image and file upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *                 description: ID of the user creating the note
 *               tittle:
 *                 type: string
 *                 example: "Introduction to Programming"
 *                 description: Title of the note
 *               description:
 *                 type: string
 *                 example: "This is a beginner's guide to programming."
 *                 description: Description of the note
 *               notes_img:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the note
 *               notes_file:
 *                 type: string
 *                 format: binary
 *                 description: PDF file for the note
 *               isPremium:
 *                 type: boolean
 *                 example: false
 *                 description: Indicates if the note is premium
 *               status:
 *                 type: boolean
 *                 example: true
 *                 description: Status of the note (active/inactive)
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

router.post(
  "/create",
  upload.fields([
    { name: "notes_img", maxCount: 1 },
    { name: "notes_file", maxCount: 1 },
  ]),
  notesController.createNote
);

/**
 * @swagger
 * /api/v1/notes/list:
 *   get:
 *     tags: [Notes]
 *     summary: Retrieve a list of all notes
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   tittle:
 *                     type: string
 *                     example: "Introduction to Programming"
 *                   description:
 *                     type: string
 *                     example: "This is a beginner's guide to programming."
 *                   slug:
 *                     type: string
 *                     example: "introduction-to-programming"
 *                   notes_img:
 *                     type: string
 *                     example: "/uploads/notes_img.jpg"
 *                   notes_file:
 *                     type: string
 *                     example: "/uploads/notes_file.pdf"
 *                   isPremium:
 *                     type: boolean
 *                     example: false
 *                   status:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Server error
 */

router.get("/list", notesController.getNotesAll);

module.exports = router;
