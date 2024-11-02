const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

exports.createUser = async (userData) => {
  try {
    const saltRounds = 10;
    const hassedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hassedPassword;

    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.getUser = async (id) => {
  return await User.findByPk(id);
};

exports.loginUser = async (userData) => {
  try {
    const isValidUser = await User.findOne({
      where: { email: userData.email },
    });

    if (!isValidUser) {
      return { error: "User not found!", status: 404 };
    }

    const isValidPassword = await bcrypt.compare(
      userData.password,
      isValidUser.password
    );

    if (!isValidPassword) {
      return { error: "Invalid Password!", status: 401 };
    }

    const token = jwt.sign(
      { id: isValidUser.id, email: isValidUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { isValidUser, token, status: 200 };
  } catch (error) {
    return { error: error.message, status: 500 };
  }
};
