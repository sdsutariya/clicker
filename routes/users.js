import express, { Router } from 'express';
const router = express.Router();
import usercontroller from '../controllers/usercontrollers.js'

router.put("/:id",usercontroller.updateUser);
router.delete("/:id",usercontroller.deleteUser);
router.get("/:id",usercontroller.getUser);
router.put("/:id/follow",usercontroller.follower);
router.put("/:id/unfollow",usercontroller.unfollow);



export default router;