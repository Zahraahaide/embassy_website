const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passportNumber: { type: String, required: true },
  nationality: { type: String, required: true },
  passportImagePath: { type: String },
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
