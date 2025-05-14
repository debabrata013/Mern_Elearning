// ✅ routes/analyticsRoutes.js
const express = require("express");
const { getUsersLoggedInLast6Months } = require("../controllers/Analyticscoontroler");

const router = express.Router();

router.get("/analytics/login-last-6-months", getUsersLoggedInLast6Months);

module.exports = router;
