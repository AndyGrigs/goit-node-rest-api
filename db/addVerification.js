// db/addVerification.js
import sequelize from "./sequelize.js";
import User from "./models/User.js";

async function addVerificationFields() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    await sequelize.sync({ alter: true });
    console.log("Verification fields added successfully");

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

addVerificationFields();
