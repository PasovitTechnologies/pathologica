const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = "mongodb+srv://admin:108nAMXxGundKImC@eafo.xsbkue3.mongodb.net/patDB?retryWrites=true&w=majority&appName=eafo";
    
    console.log(`✅ Using direct MongoDB URI: ${mongoURI}`);  // Debugging log

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('🔥 MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
