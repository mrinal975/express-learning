import { Router, response } from "express";
import { mockUsers } from "../utils/mockData.js";
import { validationSchema } from "../utils/validationSchema.js";
import { resolveIndexByUserId } from "../utils/middleware.js";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { User } from "../mongoose/schemas/users.js";

const router = Router();

router.get("/api/test", (req, res) => {
  res.send("testing users");
});

router.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello World!" });
});

router.get("/api/users", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (!filter && !value) return res.status(200).send(mockUsers);
  return res
    .status(200)
    .send(mockUsers.filter((user) => user[filter].includes(value)));
});

router.post("/api/users", checkSchema(validationSchema), async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) return res.status(400).send(results.array());

  const data = matchedData(req);
  try {
    const newUser = new User(data);
    const saveUser = await newUser.save();
    res.status(201).send(saveUser);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const user = mockUsers[findUserIndex];
  res.status(200).send(user);
});

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.status(200).send("updated successful");
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id + 1, ...body };
  return res.status(200).send("Update successful");
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
