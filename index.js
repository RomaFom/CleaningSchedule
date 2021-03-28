const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const cors = require("cors");

// Db Connection
connectDB();

// Use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://secret-everglades-99629.herokuapp.com/",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request" + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Main Route
app.get("/", (req, res) => {
  res.send("Main");
});

//Define routes
app.use("/api/workers", require("./routes/api/workers"));
app.use("/api/schedule", require("./routes/api/schedule"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Port listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listen on port ${port}`));
