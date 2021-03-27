const express = require("express");
const router = express.Router();
const config = require("config");
const Joi = require("joi");

const Worker = require("../../models/workers");

// Add new worker
router.post("/", async (req, res) => {
  const result = ValidateInput(req.body.name);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  try {
    let worker = new Worker({ name: req.body.name });
    await worker.save();
    return res.json(worker);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get all Workers
router.get("/", async (req, res) => {
  try {
    let workers = await Worker.find();
    if (workers) {
      return res.json(workers);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Delete Worker
router.delete("/:name", async (req, res) => {
  const worker = Worker.findOne({ name: req.params.name });
  if (!worker) return res.status(404).send("Worker not found");

  try {
    await Worker.findOneAndRemove({ name: req.params.name });
    res.json({ msg: "Worker deleted " });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

function ValidateInput(input) {
  const schema = Joi.string().min(3).required();
  const result = schema.validate(input);
  return result;
}

module.exports = router;
