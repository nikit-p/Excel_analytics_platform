const express = require("express");
const router = express.Router();
const { signup, login, dashboard } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

/* Routes */
router.post("/signup", signup);

router.post("/login", login);

// Protected route
router.get("/dashboard", auth, dashboard);

module.exports = router;
