const crypto = require("crypto");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const referralId = crypto.randomUUID();

  // Link expires after 24 hours
  const expiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toISOString();

  res.json({
    referralId,
    shareLink: `http://localhost:5173/referral/${referralId}`,
    expiresAt,
  });
});

module.exports = router;