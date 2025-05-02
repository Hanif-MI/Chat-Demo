import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import db from "./src/models/index.js";
import { route } from "./src/routes/index.js";
import { errorHandlerMiddleware } from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());   
app.use(urlencoded({ extended: true }));
app.use("/api", route);
app.use(errorHandlerMiddleware);

db.sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port localhost${process.env.PORT}`);
  });
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
});