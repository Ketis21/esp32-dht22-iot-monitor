require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Data = require("./models/data"); // Assuming you have a Data model

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Required for handling JSON files
app.use(express.json());
app.use(express.static("public"));

// Fetch data from MongoDB and send it to the front end
app.get("/api/data", async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

// Load environment variables
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Error: MONGO_URI is missing! Check your .env file.");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch(err => console.error("❌ MongoDB connection failed:", err));

app.use(bodyParser.json()); // Add this to read JSON bodies

// POST request to save data
app.post("/api/data", async (req, res) => {
  const { temperature, humidity } = req.body;

  try {
    const newData = new Data({
      temperature,
      humidity,
      timestamp: new Date() // Add timestamp here
    });

    await newData.save();
    res.status(201).send("Data saved successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET request to retrieve data by date
app.get("/api/data/:date", async (req, res) => {
  const { date } = req.params;
  const startOfDay = new Date(date);

  // Check if the date falls in daylight saving time (DST)
  // Adjust the offset based on your timezone
  // Example: For Eastern European Time (EET), use offset 2 hours; for daylight saving time (EEST), use 3 hours
  const isDST = startOfDay.getTimezoneOffset() < new Date(startOfDay.getFullYear(), 0, 1).getTimezoneOffset();

  // Adjust offset by 3 hours during DST, otherwise 2 hours (modify according to your timezone)
  const offset = isDST ? 3 : 2;
  startOfDay.setHours(startOfDay.getHours() - offset);

  const endOfDay = new Date(date);
  endOfDay.setDate(endOfDay.getDate() + 1);
  endOfDay.setHours(endOfDay.getHours() - offset);

  try {
    const data = await Data.find({
      timestamp: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).sort({ timestamp: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
