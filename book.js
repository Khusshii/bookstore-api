const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
        type: Number,
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      publishedDate: {
        type: Date,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });
    module.exports = mongoose.model('Book', BookSchema);
    