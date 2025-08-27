const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Signup API */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "Please enter all fields" });
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists.!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).send("Server Error.!");
  }
};

/* Login API */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields.!" });
    }
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exists.!" });
    }
    // Check password
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(400).json({ msg: "Invalid credentials.!" });
    }
    // Create JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      msg: "Login Success...",
      jwtToken,
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).send("Server error.!");
  }
};

/* Dashboard API */
const dashboard = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: `Welcome to your dashboard ${req.user.email}` });
  } catch (error) {
    res.status(500).send("Server Error.!");
  }
};

module.exports = { signup, login, dashboard };
