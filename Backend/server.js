const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const UserRoutes = require("./Routes/UserRoutes");
const JobRoutes = require("./Routes/JobRoutes");
const ApplicationRoutes = require("./Routes/ApplicationRoutes");
const cors = require("cors");

const PORT = 5000;
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Sever is running on ${PORT}`);
});
app.use("/api/users", UserRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/applicaion", ApplicationRoutes);
