const mongoose = require('mongoose');

const caretakerProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
  },
  postalCode: {
    type: String,
    required: [true, 'Please add a postal code'],
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience'],
  },
  scheduleGap: {
    type: String,
    required: [true, 'Please add a schedule gap'],
  },
  skills: {
    type: [String],
    required: [true, 'Please add skills'],
  },
  priceHourly: {
    type: Number,
    required: [true, 'Please add a price per hour'],
  },
  profilePhoto: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CaretakerProfile', caretakerProfileSchema);
