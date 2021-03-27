const express = require("express");
const router = express.Router();
const config = require("config");
const Schedule = require("../../models/schedule");
const Worker = require("../../models/workers");

//Useful variables
let dates = [];

//Get schedule
router.get("/", async (req, res) => {
  try {
    let schedule = await Schedule.find();
    if (schedule) {
      return res.json(schedule);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Init schedule
router.post("/", async (req, res) => {
  try {
    await GetUpdatedSchedule();
    res.json({ msg: "Schedule initis " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete schedule
router.delete("/", async (req, res) => {
  try {
    await Schedule.deleteMany({});
    res.json({ msg: "All schedule deleted " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Dates Conculator
function DateCalc() {
  let start = new Date("March 25, 2021 00:00:00");

  for (i = 0; i < 52; i++) {
    let date = new Date();
    date.setDate(start.getDate() + i * 7);
    date =
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      date.getFullYear();

    dates[i] = date;
  }
}
// Combine dates and workers
async function GetUpdatedSchedule() {
  await DateCalc();
  let allNames = await Worker.find();
  for (i = 0; i < 52; i++) {
    let schedule = new Schedule({
      name: allNames[i % allNames.length].name,
      date: dates[i],
      number: i,
    });

    await schedule.save();
  }
}

module.exports = router;
