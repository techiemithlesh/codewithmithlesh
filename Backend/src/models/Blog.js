const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbconfig");
const User = require("./User");

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Title Should be unique !",
      },
      validate: {
        isNull: {
          msg: "Title can not be Null",
        },
      },
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
    desciption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    banner_img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    share_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "tbl_blogs",
    timestamps: true,
  }
);

Blog.beforeValidate((blog) => {
  if (blog.title) {
    blog.slug = blog.tittle.toLowerCase().replace(/ /g, "-");
  }
});

Blog.associate((model) => {
  Blog.belongsTo(model.User, {
    foreignKey: "user_id",
    as: "user",
  });
});

module.exports = Blog;
