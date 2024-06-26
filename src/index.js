import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
