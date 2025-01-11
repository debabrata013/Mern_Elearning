const express = require('express');
const router = express.Router();

// Import coupon controller methods
const {
  createCoupon,
  getCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  deleteExpiredCoupons
} = require('../controllers/couponController');

// 1. Route to create a new coupon
router.post('/coupons', createCoupon);

// 2. Route to get all coupons
router.get('/coupons', getCoupons);

// 3. Route to get a specific coupon by coupon code
router.get('/coupons/:couponCode', getCouponByCode);

// 4. Route to update a coupon by coupon code
router.put('/coupons/:couponCode', updateCoupon);

// 5. Route to delete a coupon by coupon code
router.delete('/coupons/:couponCode', deleteCoupon);

module.exports = router;
