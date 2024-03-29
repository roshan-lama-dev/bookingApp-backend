import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { dbConnection } from "./src/config/dbConfig.js";
import cookieparser from "cookie-parser";
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
app.use(cookieparser());
// router middlewares
app.use("/api/auth", authRoute);
app.use("/api/hotel", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

// error handling
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(PORT, () => {
  console.log(`The applicaton is running at port http://localhost:${PORT}`);
});
