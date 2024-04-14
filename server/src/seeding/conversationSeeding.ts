import conversationModel from "../models/Conversation";
import employerModel from "../models/Employer";
import studentModel from "../models/Student";
import messageModel from "../models/Message";
import config from "../utils/config";
import mongoose from "mongoose";
import { getRandomIdList } from "./applicationSeeding";
import { faker } from "@faker-js/faker";

async function seedConversation() {
  try {
    await mongoose.connect(config.TEST_MONGODB_URI as string);
    console.log("Seeding conversation...");
    const seedCounts = 1;

    for (let i = 0; i < seedCounts; i++) {
      const members = [];
      const user1 = await getRandomIdList(1, employerModel);
      const user2 = await getRandomIdList(1, studentModel);
      if (!user1 || !user2) {
        console.log("Failed to fetch user");
        return;
      }
      members.push(user1[0]);
      members.push(user2[0]);
      const newCon = new conversationModel({
        members,
        messageCount: 20,
      });

      const savedNewCon = await newCon.save();

      const messagesList = [];
      for (let i = 0; i < 20; i++) {
        const newMsg = new messageModel({
          conversation: savedNewCon._id,
          sender: members[Math.floor(Math.random() * members.length)],
          content: faker.lorem.text(),
        });
        messagesList.push(newMsg);
      }

      await messageModel.insertMany(messagesList);
    }
    console.log("Conversations seeded successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    void mongoose.disconnect();
  }
}

export default seedConversation;
