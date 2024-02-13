// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;

export default {
  PORT: PORT, 
  MONGODB_URI: MONGODB_URI, 
  TEST_MONGODB_URI: TEST_MONGODB_URI,
};
