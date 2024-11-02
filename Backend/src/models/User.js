const { DataTypes } = require("sequelize");
const sequelize = require("../db/dbconfig");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address already exists",
      },
      validate: {
        isEmail: {
          msg: "Please provide a valid email address",
        },
      },
    },
    mobile_no: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: {
          msg: "Mobile number must contain only numbers",
        },
        len: {
          args: [10, 15],
          msg: "Mobile number must be between 10 and 15 digits",
        },
      },
    },
    user_type: {
      type: DataTypes.ENUM("user", "admin", "editor"),
      defaultValue: "user",
      allowNull: false,
      validate: {
        isIn: {
          args: [["user", "editor", "admin"]],
          msg: "User Type must be in 'user' or 'editor' and 'admin",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password Can not be Empty !",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

User.associate = (models) => {
  User.hasMany(models.Notes, {
    foreignKey: "user_id",
    as: "notes",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  User.hasMany(models.Blog, {
    foreignKey: "user_id",
    as: "blogs",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = User;
