const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadExcel, getUserData } = require("../controllers/uploadController");
// Multer setup
const fileUpload = multer({ dest: "uploads/" });
const auth = require("../middleware/authMiddleware");

/* Routes */
router.post("/upload", auth, fileUpload.single("file"), uploadExcel);

router.get("/data", auth, getUserData);

module.exports = router;
