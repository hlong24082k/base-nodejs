const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require("mongoose");
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express Basic API' });
});

mongoose.connect(process.env.MONGO_URL, {
    dbName: "mmoInfo",
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch((err) => console.log(`${err} did not connect`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;