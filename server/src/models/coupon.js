const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  couponCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  discount: {
    type: Number, // Can be percentage or fixed amount depending on business logic
    required: true
  },
  numberOfStudentAllow: {
    type: Number,
    required: true,
    min: [1, 'At least one student is required to use this coupon']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically set `active` to false when the `endDate` has passed
couponSchema.pre('save', function (next) {
  if (this.endDate < new Date()) {
    this.active = false;
  }
  next();
});

// Create the Coupon model
const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
