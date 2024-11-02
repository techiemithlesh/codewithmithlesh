const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/dbconfig");
const User = require("./User");

const Notes = sequelize.define(
  "Notes",
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
    tittle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Title should be unique",
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description can not be null !",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    notes_img: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    notes_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      comment: "1 FOR YES 0 FOR NO",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false,
      comment: "1 Active 0 Deactive",
    },
  },

  {
    tableName: "tbl_notes",
    timestamps: true,
  }
);

Notes.beforeValidate((note) => {
  if (note.tittle) {
    note.slug = note.tittle.toLowerCase().replace(/ /g, "-");
  }
});

Notes.associate = (model) => {
  Notes.belongsTo(model.User, {
    foreignKey: "user_id",
    as: "user",
  });
};

module.exports = Notes;
