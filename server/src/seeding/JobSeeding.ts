import jobModel from "../models/Job";
import employerModel from "../models/Employer";
import { faker } from "@faker-js/faker";
import config from "../utils/config";
import mongoose from "mongoose";

async function getIdEmployer(): Promise<string | null> {
  try {
    const randomDocument = await employerModel.aggregate([
      { $sample: { size: 1 } },
    ]);

    if (randomDocument && randomDocument.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return randomDocument[0]._id.toString();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving _id:", error);
    throw error;
  }
}

async function seedJobs() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding Jobs...");

    const seedCounts = 50;

    for (let i = 0; i < seedCounts; i++) {
      const employerId = await getIdEmployer(); // Await the result of getId()
      const employer = await employerModel.findById(employerId);
      if (!employer) {
        console.log("employer not available");
        return;
      }
      const newJob = new jobModel({
        employer: employerId,
        title: faker.person.jobTitle(),
        externalApplication:
          Math.round(Math.random()) > 0 ? faker.internet.url() : "",
        jobDescription: faker.lorem.paragraph(),
        location: faker.location.city(),
        salary: faker.number.int({ min: 10, max: 1000 }),
        status: Math.round(Math.random()) > 0 ? "open" : "close",
      });

      const savedJob = await newJob.save();
      employer.jobPosts = employer.jobPosts.concat(savedJob._id);
      await employer.save();
    }
    console.log("Jobs seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    void mongoose.disconnect();
  }
}

export default seedJobs;
