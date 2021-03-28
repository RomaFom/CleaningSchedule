const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

// Db Connection
connectDB();

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main Route
app.get("/", (req, res) => {
  res.send("Main");
});

//Define routes
app.use("/api/workers", require("./routes/api/workers"));
app.use("/api/schedule", require("./routes/api/schedule"));

// Port listen
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listen on port ${port}`));
