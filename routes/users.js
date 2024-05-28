// Import Mongoose
const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: {
    type: String,
    required: true
  },
  agreeTerms: {
    type: Boolean,
    required: true
  },
  receiveNewsletter: Boolean,
  profilePhoto: {
    type: String // Assuming you'll store the path to the photo
},
isVerified: {
  type: Boolean,
  default: false // Default value is false, indicating user is not verified initially
},
otp: String // Adding OTP field to the schema
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
