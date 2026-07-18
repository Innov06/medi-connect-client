const express = require("express");
const router = express.Router();

const { analyzeSymptoms } = require("../services/triageService");

router.post("/", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === "") {
      return res.status(400).json({
        error: "Symptoms are required"
      });
    }

    const result = await analyzeSymptoms(symptoms);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to analyze symptoms"
    });
  }
});

module.exports = router;