import crypto from "crypto"
import nodemailer from "nodemailer"
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../connectDB.js";

const otps = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'phuduccva@gmail.com', // Email của bạn
        pass: '02803652498', // Mật khẩu email
    },
});

export const sendOtp = (req, res) => {
    const { username, email } = req.body;
    // Kiểm tra đầu vào
    if (!username && !email) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // Lấy thông tin người dùng từ database
    const q = 'SELECT email FROM users WHERE username = ? AND email = ?';
    db.query(q, [username, email], async (err, results) => {
        if (err || results.length === 0) {
            console.log(err);
            return res.status(404).json({ message: 'User not found.' });
        }

        const userEmail = results[0].email;

        // Tạo OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // OTP hết hạn sau 5 phút

        // Lưu OTP vào bộ nhớ
        otps[email] = { otp, otpExpires, otpUsed: false };

        // Gửi OTP qua email
        try {
            // await transporter.sendMail({
            //     from: 'phuduccva@gmail.com',
            //     to: email,
            //     subject: 'Your OTP Code',
            //     text: `Your OTP is: ${otp}`,
            // });

            res.json({ message: 'OTP sent to your email.', otp });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to send OTP.' });
        }
    })
}

export const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    // Kiểm tra đầu vào
    if (!email || !otp) {
        return res.status(400).json({ message: 'User ID and OTP are required.' });
    }

    const userOtpData = otps[email];
    if (!userOtpData) {
        return res.status(404).json({ message: 'No OTP found for this user.' });
    }

    const { otp: storedOtp, otpExpires, otpUsed } = userOtpData;

    // Kiểm tra OTP
    if (otpUsed) {
        return res.status(400).json({ message: 'OTP has already been used.' });
    }
    if (Date.now() > otpExpires) {
        return res.status(400).json({ message: 'OTP has expired.' });
    }
    if (storedOtp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // Đánh dấu OTP đã sử dụng
    userOtpData.otpUsed = true;

    res.status(200).json({ message: 'OTP verified successfully.' });
}

export const downloadFile = (req, res) => {
    // const { email } = req.body;
    const { filename } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "../public/images", filename);

    // Kiểm tra quyền truy cập
    // if (!email || !otps[email]?.otpUsed) {
    //     return res.status(403).json({ message: 'Unauthorized to download.' });
    // }

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error("Error downloading the file:", err);
            res.status(500).send("Error downloading the file.");
        }
    });
}

