const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  passcode: {
    type: Number,
    required: true,
    minlength: 2,
  },
  activeTemplate: {
    type: Number
  },
  maxPoint: {
    type: Number
  },
  offerOne: {
    type: String
  },
  offerTwo: {
    type: String
  },
  logoUrl: {
    type: String
  },
  barcode: {
    type: String
  }
});

// set up pre-save middleware to create password
restaurantSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
restaurantSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
