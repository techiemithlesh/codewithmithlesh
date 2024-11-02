const express = require("express");
const router = express.Router();
const userController = require("../controller/User");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: suraj
 *               lastName:
 *                 type: string
 *                 example: kumar
 *               email:
 *                 type: string
 *                 example: suraj@gmail.com
 *               mobile:
 *                 type: string
 *                 example: 8271932791
 *               password:
 *                 type: string
 *                 example: 8988
 *               dob:
 *                 type: string
 *                 example: "1999-12-10"
 *               address:
 *                 type: string
 *                 example: kanke road ranchi
 *               username:
 *                 type: string
 *                 example: suraj
 *
 *     responses:
 *       201:
 *         description: User register successfully
 *       409:
 *         description: User already register
 *       500:
 *         description: Registration failed. Please try again
 */

/**
 * @swagger
 * /auth/login:
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
 *                 example: suraj@gmail.com
 *               password:
 *                 type: string
 *                 example: 8988
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */

router.post("/create", userController.createUser); // Create user

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

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

router.get("/:id", userController.getUser); // Get user by ID
router.post("/login", userController.loginUser);
// router.put('/:id', userController.updateUser);       // Update user by ID
// router.delete('/:id', userController.deleteUser);    // Delete user by ID

module.exports = router;
