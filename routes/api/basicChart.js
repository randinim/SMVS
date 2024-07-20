const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import your Chart model (replace with your actual model path)
const Chart = require("../models/BasicChart");

// GET all charts
router.get("/chartparam", async (req, res) => {
  try {
    const charts = await Chart.find();
    res.json(charts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific chart by ID
router.get("/charts/:id", getChart, (req, res) => {
  res.json(res.chart);
});

// Middleware function to get chart by ID
async function getChart(req, res, next) {
  let chart;
  try {
    chart = await Chart.findById(req.params.id);
    if (!chart) return res.status(404).json({ message: "Chart not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.chart = chart;
  next();
}

// POST a new chart
router.post("/charts", async (req, res) => {
  const chart = new Chart({
    coordinates: req.body.coordinates, // Assuming coordinates is an object with x and y properties
    chartType: req.body.chartType,
    chartName: req.body.chartName,
    creatorName: req.body.creatorName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  try {
    const newChart = await chart.save();
    res.status(201).json(newChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a chart by ID
router.delete("/charts/:id", getChart, async (req, res) => {
  try {
    await res.chart.delete();
    res.json({ message: "Chart deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a chart by ID (replace this with a more specific update logic)
router.patch("/charts/:id", getChart, async (req, res) => {
  if (req.body.chartType != null) {
    res.chart.chartType = req.body.chartType;
  }
  // Update other fields as needed based on your requirements
  try {
    const updatedChart = await res.chart.save();
    res.json(updatedChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
