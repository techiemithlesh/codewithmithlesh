const Blog = require("../models/Blog");

exports.createBlog = async (blogData) => {
  try {
    const blog = await Blog.create(blogData);

    return blog;
  } catch (error) {
    throw error;
  }
};
