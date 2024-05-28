const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const router = express.Router();
const User = require('./users'); // Adjust the path as needed
const path = require('path');

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'meethabaap0@gmail.com', // Your Gmail email address
      pass: 'hstr yotj srjc bblz',  // Your Gmail password
    },
  });

  const mailOptions = {
    from: 'meethabaap0@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for account verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// GET route for Signup page
router.get('/signup', (req, res) => {
  res.render('signup'); // Render the signup page (make sure you have a signup.ejs file)
});

// POST route for Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging statement
    const { email, password, firstName, lastName, agreeTerms, receiveNewsletter, profilePhoto } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).send('Invalid email');
    }

    const otp = generateOTP();

    await sendOTP(email, otp);

    req.session.email = email;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      agreeTerms: Boolean(agreeTerms),
      receiveNewsletter: Boolean(receiveNewsletter),
      profilePhoto,
      otp: otp.toString(),
      verified: false
    });
    await newUser.save();

    res.redirect('/verify');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// GET route for OTP verification page
router.get('/verify', (req, res) => {
  res.render('verify-otp'); // Render the verify OTP page (make sure you have a verify-otp.ejs file)
});


// GET route for Home page
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // Serve index.html from public folder
});

// POST route for OTP verification
router.post('/verify', async (req, res) => {
  try {
    const { otp } = req.body; // Retrieve OTP from request body

    // Retrieve email from session
    const email = req.session.email;

    console.log('Received email:', email);

    if (!email || typeof email !== 'string' || email.trim() === '') {
      console.log('Invalid email:', email);
      return res.status(400).send('Invalid email');
    }

    console.log('Email:', email);
    console.log('Entered OTP:', otp);

    // Find user by email
    const user = await User.findOne({ email });

    console.log('Retrieved User:', user);

    // Check if user exists and OTP matches
    if (user && user.otp && user.otp.toString() === otp.toString()) {
      // Clear OTP from user data
      user.otp = null;
      // Set user as verified
      user.isVerified = true;
      await user.save();

      // Redirect to home page or any other authenticated page
      return res.redirect('/home');
    } else {
      // Invalid OTP or user not found
      return res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
});

// GET route for Login page
router.get('/login', (req, res) => {
  res.render('login'); // Render the login page (make sure you have a login.ejs file)
});

// POST route for Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      // Redirect to verify page if not verified
      return res.redirect('/verify-otp');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful
    // You may want to add more logic here, such as generating JWT tokens
    return res.redirect('/home');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/create-resume', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/choose-template.html'));
});

module.exports = router;
