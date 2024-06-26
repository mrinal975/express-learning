import { Router } from "express";
import userRouter from "./users.js";
import productRouter from "./products.js";
import authRouter from "./auth.js";

const router = Router();
router.use(userRouter);
router.use(productRouter);
router.use(authRouter);

export default router;
