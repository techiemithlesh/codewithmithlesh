const express = require("express");
const notesController = require("../controller/NotesController");

const router = express.Router();

const multer = require("multer");
const auth = require("../middleware/auth");

const upload = multer({ dest: "tmp/" });

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

/**
 * @swagger
 * /api/v1/notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Retrieve a single note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the note to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Introduction to Programming"
 *                 description:
 *                   type: string
 *                   example: "This is a beginner's guide to programming."
 *                 slug:
 *                   type: string
 *                   example: "introduction-to-programming"
 *                 notes_img:
 *                   type: string
 *                   example: "/uploads/notes_img.jpg"
 *                 notes_file:
 *                   type: string
 *                   example: "/uploads/notes_file.pdf"
 *                 isPremium:
 *                   type: boolean
 *                   example: false
 *                 status:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Note Not Found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred on the server"
 */
router.get("/:id", auth, notesController.getNotesById);

/**
 * @swagger
 * /api/notes/update/{id}:
 *   put:
 *     summary: Update an existing note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Note Title"
 *               description:
 *                 type: string
 *                 example: "This is an updated description of the note."
 *               notes_img:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the note
 *               notes_file:
 *                 type: string
 *                 format: binary
 *                 description: PDF file for the note
 *     responses:
 *       200:
 *         description: Note updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note updated successfully!"
 *                 note:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated Note Title"
 *                     description:
 *                       type: string
 *                       example: "This is an updated description of the note."
 *                     notes_img:
 *                       type: string
 *                       example: "/uploads/notes_img.jpg"
 *                     notes_file:
 *                       type: string
 *                       example: "/uploads/notes_file.pdf"
 *                     isPremium:
 *                       type: boolean
 *                       example: false
 *                     status:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No changes made!"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Note not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Note doesn't exist!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.put(
  "/update/:id",
  auth,
  upload.fields([
    { name: "notes_img", maxCount: 1 },
    { name: "notes_file", maxCount: 1 },
  ]),
  notesController.updateById
);

/**
 * @swagger
 * /api/v1/notes/delete/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Retrieve a single note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the note to delete
 *     responses:
 *       200:
 *         description: Notes Deleted Successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Notes Deleted Successfully!
 *       400:
 *         description: Blog Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Blog Not Found
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred on the server.
 */

router.delete("/delete/:id", auth, notesController.deletNotes);

module.exports = router;
