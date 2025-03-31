const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', formRoutes);

// Start Server
const PORT = 4003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
