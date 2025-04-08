const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dontenv.config();
application.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

  const authRoutes = require('./routes/auth')
  const BookRoutes = require('./routes/books')
  app.use((err, req, res, next) => {
    res.status(500).json({
      success: false,
      message: err.message || 'Server Error'
    });
  });


  const PORT = process.env.PORT || 3000;
  app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));