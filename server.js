require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const test = require("./routes/test");
const CodeBlock = require("./models/codeBlock");
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/codeblocks", async (req, res) => {
  const codeblocks = await CodeBlock.find();
  res.json(codeblocks);
});

app.get("/codeblocks/:category", async (req, res) => {
  const codeblock = await CodeBlock.find({ category: req.params.category });
  res.json(codeblock);
});

app.post("/codeblocks", async (req, res) => {
  const codeblock = new CodeBlock({
    title: req.body.title,
    code: req.body.code,
    language: req.body.language,
    description: req.body.description,
    tags: req.body.tags,
    category: req.body.category,
  });
  await codeblock.save();
  res.json(codeblock);
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

app.listen(PORT, () => console.log(`Server running on port 3000`));
