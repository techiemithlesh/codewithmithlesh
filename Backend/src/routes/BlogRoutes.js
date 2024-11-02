const express = require("express");
const blogController = require("../controller/BlogController");

const router = express.Router();

const multer = require("multer");
const auth = require("../middleware/auth");

const upload = multer({ dest: "tmp/" });

/**
 * @swagger
 * /api/v1/blog/create:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Create a new blog with an optional image and file upload
 *     description: This endpoint allows the creation of a new blog post, including optional uploads for a thumbnail and banner image.
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
 *               title:
 *                 type: string
 *                 description: The title of the blog post.
 *                 example: "My First Blog Post"
 *               description:
 *                 type: string
 *                 description: The content or description of the blog post.
 *                 example: "This is a description of my first blog post."
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: The thumbnail image for the blog post.
 *               banner_img:
 *                 type: string
 *                 format: binary
 *                 description: The banner image for the blog post.
 *     responses:
 *       201:
 *         description: Blog post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "My First Blog Post"
 *                     description:
 *                       type: string
 *                       example: "This is a description of my first blog post."
 *       400:
 *         description: Bad request. Missing or invalid parameters.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/create",
  auth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "banner_img", maxCount: 1 },
  ]),
  blogController.postBlog
);

module.exports = router;
