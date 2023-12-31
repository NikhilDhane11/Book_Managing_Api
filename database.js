// database.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = 'mongodb://127.0.0.1:27017/Bookapp'; // Your database URI

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

module.exports = connectDB;
