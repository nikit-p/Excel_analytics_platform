const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  sheetName: String,
  data: Array,
  uploadedAt: { type: Date, default: Date.now },
});

const dataModel = mongoose.model("Data", DataSchema);
module.exports = dataModel;
