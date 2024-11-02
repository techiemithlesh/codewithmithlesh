const Blog = require("../models/Blog");
const User = require("../models/User");

exports.createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);

    return blog;
  } catch (error) {
    throw error;
  }
};

exports.listBlogs = async (page = null, limit = null) => {
  try {
    if (page && limit) {
      const offset = (page - 1) * limit;
      return await Blog.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });
    } else {
      return await Blog.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            as: "users",
          },
        ],
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.blogById = async (blogId) => {
  try {
    const blog = await Blog.findByPk(blogId);
    return blog;
  } catch (error) {
    throw error;
  }
};
