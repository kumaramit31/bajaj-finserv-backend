const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://your_mongodb_uri", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  user_id: String,
  email: String,
  roll_number: String,
  numbers: [String],
  alphabets: [String],
  highest_alphabet: [String],
});

const User = mongoose.model("User", userSchema);

// GET Endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Endpoint
app.post("/bfhl", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    const numbers = data.filter((item) => /^[0-9]+$/.test(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().pop()] : [];

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
