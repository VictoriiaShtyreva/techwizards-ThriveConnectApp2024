import mongoose from "mongoose";
import { httpServer } from "./app";
import { MongoClient } from "mongodb";
import { JobMatchingAgent } from "./langchain/agents/matchingAgent/agents";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3003;
const mongoUrl = process.env.MONGO_DB_URL as string;

if (!mongoUrl) {
  throw new Error("MongoDB URL not found in .env");
}

const client = new MongoClient(mongoUrl);

client
  .connect()
  .then(async () => {
    const analysis = await JobMatchingAgent.runMatchingAgent(
      client,
      "initialRun"
    );
    console.log("Initial matching analysis:", analysis);
    client.close();
  })
  .catch((error) => {
    console.error("Error in initial matching process:", error);
  });

mongoose
  .connect(mongoUrl, {
    dbName: "ThriveConnectApp",
  })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
