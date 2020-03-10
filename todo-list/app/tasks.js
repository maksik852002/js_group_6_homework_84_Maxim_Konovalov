const express = require("express");
const Task = require("../models/Task");

const auth = require("../authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.send(tasks[0]);
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).send({ error: "No such task found" });
    } else {
      req.body.title && (task.title = req.body.title);
      req.body.status && (task.status = req.body.status);
      req.body.description && (task.description = req.body.description);
      await task.save();
      return res.send({ message: `Task - ${task._id} successfully edited` });
    }
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.post("/", auth, async (req, res) => {
  req.body.user = req.user._id;
  const task = new Task(req.body);
  try {
    await task.save();
    return res.send({ id: task._id });
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).send({ error: "No such task found" });
    } else {
      await task.remove();
      return res.send({ message: `Task - ${task._id} successfully removed` });
    }
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
