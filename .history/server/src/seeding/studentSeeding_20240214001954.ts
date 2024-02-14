import mongoose from "mongoose";
import studentModel from "../models/Student";
const faker = require("faker");
//import config from "../utils/config";

async function seedStudents() {
    try {
        // Connect to MongoDB
        //await mongoose.connect(config.TEST_MONGODB_URI as string);
        await mongoose.connect("mongodb+srv://qminh279:leminh279@cluster1.67dtx5d.mongodb.net/testNcjApp?retryWrites=true&w=majority")
        console.log("Connected to Test MongoDB");

        const seedCounts = 1;
        const students = [];

        for (let i = 0; i < seedCounts; i++) {
            const startYear = faker.date.past(5).getFullYear();
            const endYear = faker.date.between(startYear, 2030).getFullYear();

            const student = {
                password: faker.internet.password(),
                email: faker.internet.email(),
                fullName: faker.name.findName(),
                phone: faker.numerify(Text = '##########'),
                profileDescription: faker.lorem.sentence(),
                major: faker.lorem.words(10),
                classYear: {
                    start: startYear,
                    end: endYear
                },
                degree: faker.lorem.words(10),
                accountType: "student"
            };

            students.push(student);
        }

        await studentModel.insertMany(students);
        console.log("Students seeded successfully!");
    } catch (error) {
        console.error(error);
    } finally {
        // Close MongoDB connection
        mongoose.disconnect();
    }
}

seedStudents();
