import seedEmployer from "./employerSeeding";
import seedJobs from "./JobSeeding";
import seedStudents from "./studentSeeding";

console.log("Seeding data to test database...");

const seed = async () => {
  await seedEmployer();
  await seedStudents();
  await seedJobs();
};

void seed();
