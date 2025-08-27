const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/dbConfig");
const authRouter = require("./routes/authRoutes");
const uploadRouter = require("./routes/uploadRoute");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", uploadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on...${PORT}`);
});
