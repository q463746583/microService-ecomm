// import mongoose from "mongoose";

// import { app } from "./app";

// const start = async () => {
//   console.log("step5");
//   if (!process.env.JWT_KEY) {
//     throw new Error("JWT_KEY must be defined");
//   }
//   if (!process.env.MONGO_URI) {
//     throw new Error("MONGO_URI must be defined");
//   }
//   console.log("step6");
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       // await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     console.log("Connected to MongoDb");
//   } catch (err) {
//     console.error("Error is here", err);
//   }
//   console.log("step7");
//   app.listen(3000, () => {
//     console.log("Listening on port 3000!!!!!!!!");
//   });
// };

// start();
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Must have JWT_KEY");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO url must be defined ");
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
    console.log("Tickets Service Listent on 3000！!!!!##！");
  });
};

start();
