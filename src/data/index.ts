import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({ force: true }); // Drops and recreates all tables
        console.log("Database cleared successfully.");
        exit(0); // Exit the process with success code
    } catch (e) {
        console.error("Error clearing database:", e);
        exit(1); // Exit the process with error code
    }
};

// Check for the "--clear" argument
if (process.argv[2] === "--clear") {
    clearDB();
} else {
    console.log("No '--clear' argument provided. Exiting...");
    exit(0);
}
