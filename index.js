import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

// Middlewars
app.use(cors());
app.use(express.json());

// Constants
const { DB_HOST, PORT = 3000 } = process.env;

//Routes
app.use("/api/auth", authRoute);

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`---Database connection successful on PORT:${PORT}---`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const PORT = process.env.PORT || 5501;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME;

// async function start() {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rh0ixqh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
//     );
//     app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
//   } catch (error) {
//     console.log(error);
//   }
// }
// start();
