const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/granthaveda');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing users to avoid duplicates
    await User.deleteMany({});

    // 1. Create Admin Seeker
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Vault Overlord',
      email: 'admin@granthaveda.com',
      password: adminPassword,
      role: 'admin',
      readingList: [
        { bookId: 'p1', title: 'The Bhagavad Gita', status: 'Finished', progress: 100 }
      ]
    });

    // 2. Create Regular Seeker
    const userPassword = await bcrypt.hash('user123', 10);
    const seeker = new User({
      name: 'Darshan Patil',
      email: 'darshan@seeker.com',
      password: userPassword,
      role: 'user',
      readingList: [
        { bookId: 'p2', title: 'Meditations', status: 'Reading', progress: 45 }
      ]
    });

    await admin.save();
    await seeker.save();

    console.log('Database Seeded Successfully!');
    console.log('---------------------------');
    console.log('ADMIN LOGIN: admin@granthaveda.com / admin123');
    console.log('USER LOGIN: darshan@seeker.com / user123');
    console.log('---------------------------');

    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
