const express = require("express");

const router = express.Router();

// Temporary in-memory storage
let records = [];

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      success: false,
      message: "Data must be an array",
    });
  }

  data.forEach((record) => {
    const index = records.findIndex((r) => r.id === record.id);

    if (index >= 0) {
      // Last-write-wins
      records[index] = record;
    } else {
      records.push(record);
    }
  });

  res.json({
    success: true,
    message: "Records synced successfully",
    count: data.length,
  });
});

module.exports = router;