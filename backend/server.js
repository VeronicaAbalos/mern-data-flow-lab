const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mern_lab");

// schema
const Student = mongoose.model("Student", {
  name: String,
  course: String
});

// POST API
app.post("/students", async (req, res) => {
  const data = new Student(req.body);
  await data.save();
  res.json({ message: "Saved successfully" });
});

// GET API
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
