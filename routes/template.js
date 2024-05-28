// template.js

const mongoose = require('mongoose');

// Define the schema for the Template model
const templateSchema = new mongoose.Schema({
  //  ResumeName: {
   //     type: String,
  //      required: true
  //  },
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


    // Add any additional fields you need for the template
    // For example, you might have fields for template description, category, etc.
});

// Create the Template model using the schema
const Template = mongoose.model('Template', templateSchema);

// Export the Template model
module.exports = Template;
