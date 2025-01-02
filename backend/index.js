import express from "express";
import { db } from "./connectDB.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import updateRoutes from "./routes/updateRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép origin của frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Cho phép cookies và headers đặc biệt
  })
);

app.get("/", (req, res) => {
  res.json("This is Backend Server!");
});

app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/file", downloadRoutes);

app.listen(port, () => {
  console.log("Connected to Backend server!");
});
