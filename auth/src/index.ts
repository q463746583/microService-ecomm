import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Must have JWT_KEY");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Mongo uri must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB-auth");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Auth Service Listent on 3000！!!!!##！");
  });
};

start();
