const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('GranthaVeda API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/granthaveda')
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
