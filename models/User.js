const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  cnic: {
    type: String,
    required: [true, 'Please add a CNIC'],
  },
  role: {
    type: String,
    enum: ['CareTaker', 'CareRecipent'],
    required: true
  },
}, {
  timestamps: true,
});

userSchema.index({ email: 1, role: 1 }, { unique: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
