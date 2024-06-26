import { Router } from "express";
import { mockProducts } from "../utils/mockData.js";
import { query, validationResult } from "express-validator";

const router = Router();

router.get(
  "/api/products",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("filter is must not empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("filter must be at least 3-10 characters"),
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    console.log("result", result);
    res.status(200).send(mockProducts);
  }
);

export default router;
