import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { dbConnection } from "./src/config/dbConfig.js";

import authRoute from "./src/routers/authRouter.js";
import hotelsRoute from "./src/routers/hotelsRouter.js";
import roomsRoute from "./src/routers/roomsRotuer.js";
import userRouter from "./src/routers/userRouter.js";
config();
const app = express();
const PORT = 7000;
// connecting to the database
dbConnection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// router middlewares
app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(PORT, () => {
  console.log(`The applicaton is running at port http://localhost:${PORT}`);
});
