import express from "express";
const router = express.Router();
import postcontroller from "../controllers/postcontrollers.js";

router.post("/create", postcontroller.createpost);
router.put("/update/:id", postcontroller.updatepost);
router.delete("/delete/:id", postcontroller.deletepost);
router.put("/like/:id", postcontroller.likepost);
router.get("/:id", postcontroller.getpost);
router.get("/timeline/all", postcontroller.gettimelinepost);

export default router;