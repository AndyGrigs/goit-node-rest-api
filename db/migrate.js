import sequelize from "./sequelize.js";
import Contact from "./models/contacts.js";
import User from "./models/User.js";
import { defineAssociations } from "./sequelize.js";

/**
 * Migration script to handle existing contacts without userId
 * This script will:
 * 1. Add user_id column as nullable
 * 2. Delete or assign existing contacts to a user
 * 3. Make user_id NOT NULL
 */

async function migrate() {
  try {
    console.log("Starting migration...");

    // Define associations
    await defineAssociations();

    // Connect to database
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync with alter to add the nullable user_id column
    await sequelize.sync({ alter: true });
    console.log("Schema synchronized - user_id column added as nullable.");

    // Check if there are any contacts without userId
    const orphanedContacts = await Contact.count({
      where: { userId: null },
    });

    console.log(`Found ${orphanedContacts} contacts without userId.`);

    if (orphanedContacts > 0) {
      console.log("\nOptions:");
      console.log("1. Delete all orphaned contacts");
      console.log("2. Assign them to the first user");
      console.log("\nFor this migration, we'll DELETE orphaned contacts.");
      console.log(
        "If you want to keep them, stop the script and modify it.\n"
      );

      // Delete orphaned contacts (safest option)
      const deleted = await Contact.destroy({
        where: { userId: null },
      });

      console.log(`Deleted ${deleted} orphaned contacts.`);
    }

    console.log("\nMigration completed successfully!");
    console.log(
      "You can now change userId back to allowNull: false in the Contact model."
    );

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
