const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const admin = new User({
      username: 'tech.admin@eafo.info',
      password: '79m@3Zw50[%FF0',
    });
    await admin.save();
    console.log('Admin user created successfully.');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error creating admin user:', err);
    mongoose.connection.close();
  }
};

createAdmin();