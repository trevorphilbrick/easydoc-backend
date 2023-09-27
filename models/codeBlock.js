const mongoose = require("mongoose");
const { Schema } = mongoose;

const codeBlockSchema = new Schema({
  title: String,
  code: String,
  language: String,
  description: String,
  tags: [String],
  category: String,
});

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema, "codeblocks");

module.exports = CodeBlock;
