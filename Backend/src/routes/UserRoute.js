const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({ dest: "tmp" });

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mithlesh"
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 example: "techie.mithlesh@gmail.com"
 *                 description: The user's email address
 *               mobile_no:
 *                 type: string
 *                 example: "7667043372"
 *                 description: The user's mobile number
 *               user_type:
 *                 type: string
 *                 enum: [user, editor, admin]
 *                 example: "user"
 *                 description: Role of the user
 *               password:
 *                 type: string
 *                 example: "123456"
 *                 description: The user's password
 *               address:
 *                 type: string
 *                 example: "Harmu Ranchi"
 *                 description: The user's address
 *               profile_img:
 *                 type: string
 *                 format: binary
 *                 description: Upload user profile image
 *               status:
 *                 type: boolean
 *                 example: true
 *                 description: Status of the user (active or inactive)
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already registered
 *       500:
 *         description: Registration failed. Please try again
 */

router.post(
  "/create",
  upload.fields([{ name: "profile_img", maxCount: 1 }]),
  userController.createUser
);

/**
 * @swagger
 *   /api/v1/users/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ttest@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: Invalid credentials or errors
 */

router.post("/login", userController.loginUser);

/**
 * @swagger
 * /api/v1/auth/users/{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       404:
 *         description: User not found
 */
router.get("/:id", auth, userController.getUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_no:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               profile_img:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */

// router.put('/:id', userController.updateUser);       // Update user by ID
// router.delete('/:id', userController.deleteUser);    // Delete user by ID

module.exports = router;
