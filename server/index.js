require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat"); // new chat routes

// database connection
const mongoose = require('mongoose');
const url = process.env.DB;
mongoose.connect(url);

const con = mongoose.connection;

con.on('open', () => {
  console.log('Connected to the database...');
});

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes); // new chat routes

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
