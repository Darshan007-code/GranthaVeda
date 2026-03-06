const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  favorites: [{ type: String }],
  readingList: [{
    bookId: String,
    title: String,
    status: { type: String, enum: ['Want to Read', 'Reading', 'Finished'], default: 'Want to Read' },
    progress: { type: Number, default: 0 }, // percentage
    addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
