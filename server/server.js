const connectDB = require("./config/database");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const triageRoute = require("./routes/triage");
const syncRoutes = require("./routes/sync");


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/sync", syncRoutes);

app.use("/api/triage", triageRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});