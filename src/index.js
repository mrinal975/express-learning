import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import routes from "./routes/index.js";
import session from "express-session";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://localhost:27017/express_tutorial")
  .then(() => console.log("connected to mongoose"))
  .catch((err) => console.log("connection error", err));

app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
