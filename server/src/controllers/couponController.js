const Coupon = require('../models/coupon');

// 1. Create Coupon
const createCoupon = async (req, res) => {
  try {
    const { title, couponCode, discount, numberOfStudentAllow, startDate, endDate } = req.body;

    // Ensure start date is before end date
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'Start date cannot be after end date' });
    }

    const newCoupon = new Coupon({ title, couponCode, discount, numberOfStudentAllow, startDate, endDate });
    await newCoupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating coupon' });
  }
};

// 2. Get All Coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.status(200).json({ coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching coupons' });
  }
};

// 3. Get a Specific Coupon by Coupon Code
const getCouponByCode = async (req, res) => {
  const { couponCode } = req.params;
  try {
    const coupon = await Coupon.findOne({ couponCode });
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json({ coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching coupon' });
  }
};

// 4. Update Coupon
const updateCoupon = async (req, res) => {
  const { couponCode } = req.params;
  try {
    const updatedCoupon = await Coupon.findOneAndUpdate({ couponCode }, req.body, { new: true });
    if (!updatedCoupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon updated', coupon: updatedCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating coupon' });
  }
};

// 5. Delete Coupon by Coupon Code
const deleteCoupon = async (req, res) => {
  const { couponCode } = req.params;
  try {
    const deletedCoupon = await Coupon.findOneAndDelete({ couponCode });
    if (!deletedCoupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted', coupon: deletedCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting coupon' });
  }
};

// 6. Delete Expired Coupons (Auto-deletion logic)
const deleteExpiredCoupons = async () => {
  try {
    const currentDate = new Date();
    const result = await Coupon.deleteMany({ endDate: { $lt: currentDate } });
    console.log(`${result.deletedCount} expired coupons deleted.`);
  } catch (error) {
    console.error('Error deleting expired coupons:', error);
  }
};

// Export functions
module.exports = {
  createCoupon,
  getCoupons,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  deleteExpiredCoupons
};
