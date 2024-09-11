const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const VisaApplication = require('../models/VisaApplication');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Apply for visa
router.post('/apply', auth, upload.fields([
    { name: 'passport', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'invitation', maxCount: 1 },
    { name: 'financialProof', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const caseId = 'VISA-' + Date.now();
      const newApplication = new VisaApplication({
        userId: req.user.id,
        caseId: caseId,
        ...req.body,
        passportCopy: req.files['passport'] ? req.files['passport'][0].path : null,
        photo: req.files['photo'] ? req.files['photo'][0].path : null,
        invitationLetter: req.files['invitation'] ? req.files['invitation'][0].path : null,
        financialProof: req.files['financialProof'] ? req.files['financialProof'][0].path : null,
      });
  
      await newApplication.save();
      res.status(201).json({ message: 'Visa application submitted successfully', caseId: caseId });
    } catch (error) {
      console.error('Error in visa application:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
module.exports = router;