import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import LocationsRouter from "./routes/locations";
import ErrorHandler from "./middlewares/error";
import UserRouter from "./routes/user";
import UtilMiddleware from "./middlewares/utilMiddlewares.js";

const database =
  process.env.DATABASE_URL ||
  "mongodb+srv://wib_admin:5CHOjRRSLJJD1Le1@popmgt-t7q52.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
mongoose.connect(database, { useNewUrlParser: true });

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Resources
app.use("/api/v1/locations", UtilMiddleware.authenticate, LocationsRouter);

app.use("/api/v1/user", UserRouter);

// Error Handling
app.use(ErrorHandler.customError);
app.use(ErrorHandler.handleError);

export default app;
