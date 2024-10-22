const UserServices = require("../services/User");

exports.createUser = async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).json(user);
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
