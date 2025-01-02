import { createVersion, getLatestVersion } from "../models/versionModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/vnd.android.package-archive") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only APK is allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 50, // Giới hạn kích thước file 50MB
  },
});

const uploadVersion = (req, res) => {
  const { version } = req.body;
  const apkFile = req.file;

  if (!apkFile) return res.status(400).send("No file uploaded");

  const versionData = {
    version,
    size: (apkFile.size / (1024 * 1024)).toFixed(2),
    file_name: apkFile.originalname,
    apk_path: apkFile.path,
    created_at: new Date(),
  };

  createVersion(versionData, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Version uploaded successfully");
  });
};

const getLatestVersionInfo = (req, res) => {
  getLatestVersion((err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("No versions found");

    const latestVersion = results[0];
    res.status(200).json(latestVersion);
  });
};

export const downloadUpdate = (req, res) => {
  const { filename } = req.params;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "../public/images", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Error downloading the file.");
    }
  });
};

export { upload, uploadVersion, getLatestVersionInfo };
