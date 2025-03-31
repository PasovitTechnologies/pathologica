const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
require('dotenv').config();


app.use(cors({
  origin: 'https://admin.pathologica.ru',  // ✅ Only allow your frontend domain
  credentials: true,                        // ✅ Allow cookies and authorization headers
}));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
