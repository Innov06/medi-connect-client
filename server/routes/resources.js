const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const resources = await Resource.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: 10000,
        },
      },
    });

    res.json(resources);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;