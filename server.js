// user - maddykulkarni33_db_user
// pass - l7hQlYxF0qK7scz9
//conn string - mongodb+srv://maddykulkarni33_db_user:<db_password>@cluster.lw8igex.mongodb.net/?appName=Cluster
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const packageRoutes = require("./routes/packageRoutes");

const app = express();

// connect DB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", require("./routes/bookingRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
