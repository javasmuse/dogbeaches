const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // add middleware for cors
const connectDB = require("./config/db");


// load env (environment) vars
dotenv.config({
    path: "./config/config.env"
});

// Connect to datebase
connectDB();

const app = express(); // initialize express

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api/v1/beaches", require("./routes/beaches"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on flamingo juice ${process.env.NODE_ENV} on port ${PORT}`));