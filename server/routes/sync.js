const express = require("express");
const router = express.Router();

const SyncRecord = require("../models/SyncRecord");

router.post("/", async (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      success: false,
      message: "Data must be an array",
    });
  }

  try {
    for (const record of data) {
      await SyncRecord.findOneAndUpdate(
        { id: record.id },
        record,
        {
          upsert: true,
          new: true,
        }
      );
    }

    res.json({
      success: true,
      message: "Records synced successfully",
      count: data.length,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;