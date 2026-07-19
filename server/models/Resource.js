const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["Health Center", "Pharmacy"],
    required: true,
  },

  coordinates: {
    type: {
      type: String,
      default: "Point",
    },

    coordinates: {
      type: [Number],
      required: true,
    },
  },

  contact: {
    type: String,
  },
});

ResourceSchema.index({
  coordinates: "2dsphere",
});

module.exports = mongoose.model("Resource", ResourceSchema);