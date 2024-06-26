import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";

const router = Router();

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send(req.user);
});

router.get("/api/auth/status", (req, res) => {
  res.status(200).send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).send(err);
  });
  res.sendStatus(200);
});

export default router;
