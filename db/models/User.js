import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Invalid email format",
      },
    },
  },
  subscription: {
    type:DataTypes.ENUM("starter", "pro", "business"),
    defaultValue: "starter",
  },
  token: {
    type:DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: {
    type: DataTypes.STRING,
  },
},
{
    tableName: "users",
    timestamps: true,
    underscored: true, // created_at, updated_at
  }
);

export default User;