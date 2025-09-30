const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profilePhoto") {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Only image files are allowed for profile photo"),
        false
      );
    }
  }
  if (file.fieldname === "resume") {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for resume"), false);
    }
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
