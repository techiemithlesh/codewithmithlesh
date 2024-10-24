const express = require("express");
const router = express.Router();
const userController = require("../controller/User");

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get an example
 *     responses:
 *       200:
 *         description: A successful response
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
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
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */

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

router.post("/create", userController.createUser); // Create user
router.get("/:id", userController.getUser); // Get user by ID
router.post("/login", userController.loginUser);
// router.put('/:id', userController.updateUser);       // Update user by ID
// router.delete('/:id', userController.deleteUser);    // Delete user by ID

module.exports = router;
