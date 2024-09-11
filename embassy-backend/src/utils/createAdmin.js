require('dotenv').config();
console.log(process.env.MONGODB_URI);
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  try {
    const admin = new Admin({
      username: 'admin',
      password: 'admin'
    });
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('Could not connect to MongoDB', err);
  process.exit(1);
});