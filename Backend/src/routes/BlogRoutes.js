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

/**
 * @swagger
 * /api/v1/blog/list:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Retrieve a list of blog posts
 *     description: This endpoint retrieves a list of blog posts with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: The page number for pagination (defaults to 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 12
 *         required: false
 *         description: The number of items per page for pagination (defaults to 12).
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: "Bearer <your_token>"
 *         required: true
 *         description: Bearer token for authentication.
 *     responses:
 *       200:
 *         description: A list of blog posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog list fetched successfully!"
 *                 blog:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 100
 *                     rows:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: "My First Blog Post"
 *                           description:
 *                             type: string
 *                             example: "This is a description of my first blog post."
 *                           thumbnail:
 *                             type: string
 *                             example: "/upload/blogs/thumbnail1.jpg"
 *                           banner_img:
 *                             type: string
 *                             example: "/upload/blogs/banner1.jpg"
 *       400:
 *         description: Bad request - validation errors.
 *       401:
 *         description: Unauthorized - missing or invalid token.
 *       500:
 *         description: Internal server error.
 */
router.get("/list", auth, blogController.list);
router.get("/:id", auth, blogController.getBlogById);

module.exports = router;
