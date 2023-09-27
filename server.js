require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const test = require("./routes/test");
const CodeBlock = require("./models/codeBlock");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/codeblocks", async (req, res) => {
  console.log("attempting to get codeblocks...");
  try {
    const codeblocks = await CodeBlock.find();
    res.json(codeblocks);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/codeblocks/:category", async (req, res) => {
  console.log("attempting to get codeblocks by category...");
  try {
    const codeblocks = await CodeBlock.find({ category: req.params.category });
    res.json(codeblocks);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/codeblocks", async (req, res) => {
  console.log("attempting to post codeblock...");
  const codeblock = new CodeBlock({
    title: req.body.title,
    code: req.body.code,
    language: req.body.language,
    description: req.body.description,
    tags: req.body.tags,
    category: req.body.category,
  });
  try {
    await codeblock.save();
    res.json(codeblock);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongodDB connected..!");
  } catch (err) {
    console.log(err.message);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
