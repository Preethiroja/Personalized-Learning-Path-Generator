const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const User = require("./User"); // User model
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/learningPathDB";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- Routes ---------------- //

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();
    res.json({ message: "Signup successful! Please login." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: "Invalid password" });

    res.json({
      userId: user._id,
      skills: user.skills,
      goal: user.goal,
      path: user.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Save/Update Learning Path
app.post("/api/savePath", async (req, res) => {
  try {
    const { userId, skills, goal, path } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.skills = skills;
    user.goal = goal;
    user.path = path;
    await user.save();

    res.json({ message: "Path saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving path" });
  }
});

// Get Learning Path
app.get("/api/getPath/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      skills: user.skills,
      goal: user.goal,
      path: user.path,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching path" });
  }
});
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});


// ---------------- Start Server ---------------- //
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Get all users (admin view)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching users" });
  }
});

// Get single user by ID
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching user" });
  }
});

// Update skills, goal, or path
app.put("/api/user/:id", async (req, res) => {
  try {
    const { skills, goal, path } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (skills) user.skills = skills;
    if (goal) user.goal = goal;
    if (path) user.path = path;

    await user.save();
    res.json({ message: "User updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error updating user" });
  }
});

// Delete user
app.delete("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting user" });
  }
});
