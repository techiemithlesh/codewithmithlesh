const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbconfig");

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
        model: "users",
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
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
    },
    description: {
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
    blog.slug = blog.title.toLowerCase().replace(/ /g, "-");
  }
});

Blog.associate = (models) => {
  Blog.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = Blog;
