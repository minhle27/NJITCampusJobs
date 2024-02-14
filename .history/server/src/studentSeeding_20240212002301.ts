import mongoose from "mongoose";
import studentModel from "./src/models/Student";
const faker = require("faker");
import config from "./src/utils/config";

async function seedStudents() {
    try {
        // Connect to MongoDB
        console.log("Config:", config);
        console.log("MongoDB URI:", config.TEST_MONGODB_URI as string);
        await mongoose.connect(config.TEST_MONGODB_URI as string);
        console.log("Connected to Test MongoDB");

        const seedCounts = 500;
        const students = [];

        for (let i = 0; i < seedCounts; i++) {
            const startYear = faker.date.past(5).getFullYear();
            const endYear = faker.date.between(startYear, new Date()).getFullYear();

            const student = {
                password: faker.internet.password(),
                email: faker.internet.email(),
                fullName: faker.name.findName(),
                phone: faker.phone.phoneNumber(),
                profileDescription: faker.lorem.sentence(),
                major: faker.lorem.word(),
                classYear: {
                    start: startYear,
                    end: endYear
                },
                degree: faker.lorem.word(),
                accountType: "student"
            };

            students.push(student);
        }

        await studentModel.insertMany(students);
        console.log("Students seeded successfully!");
    } catch (error) {
        console.error("Error seeding students:", error);
    } finally {
        // Close MongoDB connection
        mongoose.disconnect();
    }
}

seedStudents();
