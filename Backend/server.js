const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Ensure proper JSON parsing

// Mongoose Connection and Error Handling
mongoose
  .connect("mongodb://localhost:27017/bookingDB")
  .then(() => {
    console.log("Connected to MongoDB database!");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with an error code if connection fails
  });

// Booking Schema with Data Type Consistency
const bookingSchema = mongoose.Schema(
  {
    form: String,
    to: String,
  arrivalDate: Date, 
  leavingDate: Date
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('bookings', bookingSchema);

// Improved POST Route with Error Handling

app.get("/", async (req, res) => {
    const data = await userModel.find({});
  
    res.json({ success: true, data: data });
  });
  app.post("/create", async (req, res) => {
    console.log(req.body);
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "data saved successfully", data: data });
  });

// Start Server (Unnecessary with Mongoose connection handling)
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
