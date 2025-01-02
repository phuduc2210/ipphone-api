import express from "express";
import { getAllUsers, getUser } from "../controllers/users.js";

const router = express.Router();

router.get("/find/:userId", getUser);
router.get("/all", getAllUsers);

export default router;
