const UserServices = require("../services/User");
const jwt = require("jsonwebtoken");
const uploadImage = require("./ImageUpload");

exports.createUser = async (req, res) => {
  try {
    let userData = req.body;
    let userProfilePath = null;

    if (req.files && req.files.profile_img && req.files.profile_img[0]) {
      const folderName = "users";
      userProfilePath = await uploadImage(req.files.profile_img[0], folderName);
    }

    const userCreate = {
      ...userData,
      profile_img: userProfilePath,
    };

    const user = await UserServices.createUser(userCreate);

    res.status(201).json({
      message: "User Created Successfully!",
      user,
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

exports.getUser = async (req, res) => {
  try {
    const user = await UserServices.getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { token, status, error } = await UserServices.loginUser(req.body);

    if (status !== 200) {
      return res.status(status).json({
        message: error || "Login failed",
        status,
      });
    }

    return res.status(200).json({
      status,
      message: "User Login Successfully !",
      token,
    });
  } catch (error) {
    return res.json({
      message: error,
      status: 404,
    });
  }
};
