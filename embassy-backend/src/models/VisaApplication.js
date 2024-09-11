const mongoose = require('mongoose');

const visaApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseId: {
    type: String,
    required: true,
    unique: true
  },
  visaType: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  nationality: String,
  passportNumber: String,
  passportExpiryDate: Date,
  entryDate: Date,
  exitDate: Date,
  purpose: String,
  address: String,
  phone: String,
  email: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  passportCopy: String,
  photo: String,
  invitationLetter: String,
  financialProof: String,
  submissionDate: {
    type: Date,
    default: Date.now
  },
  reviewDate: Date,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  comments: String
}, { timestamps: true });

module.exports = mongoose.model('VisaApplication', visaApplicationSchema);