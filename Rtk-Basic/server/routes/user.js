import express from "express";

import { signin, signup, signinGoogle, getUser } from "../controllers/user.js";

const router = express.Router();
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signinGoogle", signinGoogle);
router.get("/:id", getUser);

export default router;
