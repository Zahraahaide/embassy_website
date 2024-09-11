const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('./models/User');
const auth = require('./middleware/auth');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const visaRoutes = require('./routes/visaRoutes');

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/visa', visaRoutes);
app.use('/api/admin/appointments', appointmentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// User Routes
app.post('/api/users/register', upload.single('passportImage'), async (req, res) => {
  try {
    const { name, email, password, passportNumber, nationality } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      passportNumber,
      nationality,
      passportImagePath: req.file ? req.file.path : null
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', passportImagePath: user.passportImagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create and sign JWT
      const payload = {
        id: user._id,
        isAdmin: false
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          console.log('Generated token payload:', payload);
          res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              nationality: user.nationality
            }
          });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

 app.get('/api/users/profile', auth, async (req, res) => {
  console.log('Profile route accessed');
  console.log('req.user:', req.user);
  try {
    if (!req.user || !req.user.id) {
      console.log('User not properly set in request');
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user);
    res.json(user);
  } catch (error) {
    console.error('Error in profile route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Appointment Routes
app.use('/api/appointments', appointmentRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));