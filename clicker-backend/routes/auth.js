import express from "express";
import authcontroller from "../controllers/authcontrollers.js";
const router = express.Router();

router.post("/signup", authcontroller.signup);
router.post("/signin", authcontroller.signin);

export default router;
