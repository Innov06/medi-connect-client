const crypto = require("crypto");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const referralId = crypto.randomUUID();

  res.json({
    referralId,
    shareLink: `http://localhost:5173/referral/${referralId}`,
  });
});

module.exports = router;