const express = require('express');
const router = express.Router();
const { generateInvoice, generateCertificate } = require("../controllers/invoice");

// Route for generating invoices
router.get('/generate-invoice', generateInvoice);

// Route for generating certificates
router.get('/generate-certificate', generateCertificate);

module.exports = router;
