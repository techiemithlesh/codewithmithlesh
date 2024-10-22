const User = require("../models/User");

exports.createUser = async (userData) => {
  return await User.create(userData);
};
