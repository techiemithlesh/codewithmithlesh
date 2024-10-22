const express = require("express");
const router = express.Router();
const userController = require("../controller/User");

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

router.post("/create", userController.createUser); // Create user
// router.get('/:id', userController.getUser);          // Get user by ID
// router.put('/:id', userController.updateUser);       // Update user by ID
// router.delete('/:id', userController.deleteUser);    // Delete user by ID

module.exports = router;
