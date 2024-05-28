// resume.js

const mongoose = require('mongoose');

// Define the schema for the Resume model
const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    graduation: {
        type: String,
        required: true
    },
    postgrad: {
        type: String,
        required: true
    },
    tenth: {
        type: String,
        required: true
    },
    twelfth: {
        type: String,
        required: true
    },
    technical: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    projects: {
        type: String,
        required: true
    },
    schooling: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create the Resume model using the schema
const Resume = mongoose.model('Resume', resumeSchema);

// Export the Resume model
module.exports = Resume;
