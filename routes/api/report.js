const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ReportModel = require("../../models/Report");

const multer = require("../../multer");

router.post(
  "/",
  // multer.single("pdf"),
  async (req, res) => {
    const { name, creator, comments } = req.body;

    const newReport = new ReportModel({
      name,
      creator,
      comments,
      pdf: req.file ? req.file.filename : null, // Save PDF filename if uploaded
    });

    try {
      const savedReport = await newReport.save();
      res.status(201).json(savedReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating report" });
    }
  }
);

router.get("/all", async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reports" });
  }
});

router.put(
  "/getreport/:id",
  // multer.single("pdf"),
  async (req, res) => {
    const { id } = req.params;
    const { name, creator, comments } = req.body;

    const updates = { name, creator, comments };

    if (req.file) {
      updates.pdf = req.file.filename; // Update PDF filename if uploaded
    }

    try {
      const updatedReport = await ReportModel.findByIdAndUpdate(id, updates, {
        new: true,
      }); // Return updated document
      if (!updatedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(updatedReport);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating report" });
    }
  }
);

router.delete("/deletereport/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await ReportModel.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    // Optionally handle deleting the uploaded PDF if needed (consider storage strategy)
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting report" });
  }
});

module.exports = router;
