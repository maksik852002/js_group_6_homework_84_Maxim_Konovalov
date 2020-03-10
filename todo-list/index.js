const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const tasks = require("./app/tasks");
const users = require("./app/users");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const run = async () => {
  await mongoose.connect("mongodb://localhost/todoList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  app.use("/tasks", tasks);
  app.use("/users", users);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => {
  console.error(e);
});
