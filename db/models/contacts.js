import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Contact = sequelize.define(
  "Contact",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email format",
        },
        notEmpty: {
          msg: "Email is required",
        },
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone is required",
        },
      },
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "contacts", // Явно вказуємо назву таблиці
    timestamps: true, // Автоматично додасть createdAt та updatedAt
    underscored: true, // Використовувати snake_case для полів (created_at замість createdAt)
  }
);

export default Contact;