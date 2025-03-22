const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required'],
    min: [1000, 'Year must be greater than 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
  },
});

module.exports = mongoose.model('Book', BookSchema);