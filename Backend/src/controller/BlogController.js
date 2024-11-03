const Blog = require("../models/Blog");
const blogServices = require("../services/Blog");
const uploadImage = require("./ImageUpload");
const fs = require("fs");
const path = require("path");

exports.postBlog = async (req, res) => {
  try {
    let blogData = req.body;

    let thumbnailPath = null;
    let bannerImgPath = null;

    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const folderName = "blog/thumbnail";
      thumbnailPath = await uploadImage(req.files.thumbnail[0], folderName);
    }

    if (req.files && req.files.banner_img && req.files.banner_img[0]) {
      const folderName = "blog/banner";
      bannerImgPath = await uploadImage(req.files.banner_img[0], folderName);
    }

    const blog = {
      ...blogData,
      thumbnail: thumbnailPath,
      banner_img: bannerImgPath,
    };

    const data = await blogServices.createBlog(blog);

    if (!data) {
      return res
        .status(400)
        .json({ status: false, message: "Error Posting Blog!" });
    }

    return res.status(200).json({
      status: true,
      message: "Blog Created Successfully !",
      blog: data,
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

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.body.params || {};

    let blogList = null;

    if (page && limit) {
      blogList = await blogServices.listBlogs(page, limit);
    } else {
      blogList = await blogServices.listBlogs();
    }

    return res.status(200).json({
      message: "Blog list fetched successfully !",
      blog: blogList,
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

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    if (!blogId) {
      return res.status(404).send("Blog id not found !");
    }

    const blog = await blogServices.blogById(blogId);

    if (!blog) {
      return res.status(404).send("Blog not found of given id");
    }

    return res.status(200).send(blog);
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

exports.updateBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    let blogData = req.body;

    const existingBlog = await Blog.findByPk(id);
    if (!existingBlog) {
      return res.status(404).send("Blog Not Found!");
    }

    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const oldThumbnail = path.join(
        __dirname,
        "..",
        "public",
        existingBlog.thumbnail
      );
      console.log("Old Thumbnail Path:", oldThumbnail);

      if (fs.existsSync(oldThumbnail)) {
        try {
          fs.unlinkSync(oldThumbnail);
          console.log("Old thumbnail deleted successfully.");
        } catch (deleteError) {
          console.error("Error deleting old thumbnail:", deleteError);
        }
      } else {
        console.log("Old thumbnail does not exist:", oldThumbnail);
      }

      const folderName = "blog/thumbnail";
      blogData.thumbnail = await uploadImage(
        req.files.thumbnail[0],
        folderName
      );
    }

    if (req.files && req.files.banner_img && req.files.banner_img[0]) {
      const oldBannerImg = path.join(
        __dirname,
        "..",
        "public",
        existingBlog.banner_img
      );
      if (fs.existsSync(oldBannerImg)) {
        fs.unlinkSync(oldBannerImg);
      }
      const folderName = "blog/banner";
      blogData.banner_img = await uploadImage(
        req.files.banner_img[0],
        folderName
      );
    }

    // console.log("Blog Data Before Update:", blogData);

    const [updated] = await Blog.update(blogData, {
      where: { id },
    });

    if (updated) {
      const updatedBlog = await Blog.findByPk(id);
      return res.status(200).json({
        message: "Blog Updated Successfully!",
        blog: updatedBlog,
      });
    } else {
      return res.status(400).json({
        message: "No changes made to the blog.",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
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

exports.deleteBlog = async (req, res) => {
  let id = req.params.id;

  const existingBlog = await Blog.findByPk(id);

  if (!existingBlog) {
    return res.status(400).send("Blog Not Found");
  }

  const oldThumbnailPath = path.join(
    __dirname,
    "..",
    "public",
    existingBlog.thumbnail
  );
  const oldBannerImgPath = path.join(
    __dirname,
    "..",
    "public",
    existingBlog.banner_img
  );

  if (fs.existsSync(oldThumbnailPath)) {
    fs.unlinkSync(oldThumbnailPath);
  }

  if (fs.existsSync(oldBannerImgPath)) {
    fs.unlinkSync(oldBannerImgPath);
  }

  return res.status(200).send("Blog Deleted Successfully !");
};
