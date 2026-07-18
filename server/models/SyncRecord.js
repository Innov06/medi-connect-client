const mongoose = require("mongoose");

const syncRecordSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  patient: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("SyncRecord", syncRecordSchema);