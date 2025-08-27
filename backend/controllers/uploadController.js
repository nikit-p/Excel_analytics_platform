const dataModel = require("../models/data");
const XLSX = require("xlsx");

const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded !" });
    }

    const { originalname, path } = req.file;
    const userId = req.user.id;

    // check if the same file exists for this user
    const existing = await dataModel.findOne({
      user: userId,
      filename: originalname,
    });
    if (existing) {
      return res
        .status(400)
        .json({ msg: "You have already uploaded this file" });
    }

    //const filePath = req.file.path;
    const workBook = XLSX.readFile(path);
    const sheetName = workBook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);

    const newFile = new dataModel({
      user: userId,
      filename: req.file.originalname,
      sheetName,
      data: sheetData,
    });

    await newFile.save();

    res.json({ msg: "File uploaded and saved", data: newFile });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await dataModel
      .find({ user: userId })
      .sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { uploadExcel, getUserData };
