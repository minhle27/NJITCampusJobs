import mongoose from "mongoose";
import jobModel from "../models/Job";
import employerModel from '../models/Employer';
const faker = require("faker");

async function getId(): Promise<string | null>{
    try {
        // Your query criteria to find the document
        const randomDocument = await employerModel.aggregate([
            { $sample: { size: 1 } }
        ]);

        // Execute the query to find the document
        if (randomDocument && randomDocument.length > 0) {
            // If a random document is found, return its _id
            return randomDocument[0]._id.toString(); // Assuming you've transformed _id to id in your schema
        } else {
            // If no document is found, return null
            return null;
        }
    } catch (error) {
        console.error("Error retrieving _id:", error);
        throw error;
    }
}

async function seedJobs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://qminh279:leminh279@cluster1.67dtx5d.mongodb.net/testNcjApp?retryWrites=true&w=majority"
    );
    console.log("Connected to Test MongoDB");

    const seedCounts = 1;
    const jobs = [];

    for (let i = 0; i < seedCounts; i++) {
      const employerId = await getId(); // Await the result of getId()

      const job = {
        employer: employerId,
        title: faker.name.jobTitle(),
        externalApplication: faker.internet.url(),
        jobDescription: faker.lorem.paragraph(),
        location: faker.address.city(),
        applicants: {
            accepted: [],
            pending: [],
            rejected: []
        },
        salary: faker.random.number({ min: 30000, max: 100000 }),
        status: "open"
      };

      jobs.push(job);
    }

    await jobModel.insertMany(jobs);
    console.log("Jobs seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    // Close MongoDB connection
    mongoose.disconnect();
  }
}

seedJobs();
