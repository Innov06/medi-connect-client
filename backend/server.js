const express = require("express");
const cors = require("cors");
const generateReferralPDF = require("./pdfTemplate");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================
// Triage API
// ==========================
app.post("/api/triage", (req, res) => {
  res.json({
    urgency: "Medium",
    guidance: [
      "Drink water",
      "Rest",
      "Take medicine",
      "Visit PHC if symptoms worsen"
    ]
  });
});

// ==========================
// Referral PDF API
// ==========================
app.post("/api/referral", (req, res) => {
  const {
    name,
    age,
    symptoms,
    urgency,
    facility,
    language
  } = req.body;

  // Validate required fields
  if (!name || !age || !symptoms) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  // Generate PDF
  generateReferralPDF(
    {
      name,
      age,
      symptoms,
      urgency,
      facility,
      language
    },
    res
  );
});

// ==========================
// Start Server
// ==========================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});