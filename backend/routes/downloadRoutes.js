import express from "express";
import { sendOtp, verifyOtp, downloadFile } from "../controllers/download.js";

const router = express.Router();

router.post("/request-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/download/:filename", downloadFile);

export default router;