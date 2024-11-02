const blogServices = require("../services/Blog");
const uploadImage = require("./ImageUpload");

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
