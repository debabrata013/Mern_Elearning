const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const port = 3000;

// Utility function to generate an invoice as a PDF
const generateInvoice = (invoiceData, res) => {
  // Create a new PDF document
  const doc = new PDFDocument({ autoFirstPage: false });

  // Set the content type as PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=invoice.pdf');

  // Pipe the PDF output to the response
  doc.pipe(res);

  // Add a new page to the document
  doc.addPage();

  // Title
  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();

  // Invoice Details
  doc.fontSize(12).text(`Invoice Number: ${invoiceData.invoiceNumber}`);
  doc.text(`Date: ${invoiceData.date}`);
  doc.text(`Due Date: ${invoiceData.dueDate}`);
  doc.text(`Billing Address: ${invoiceData.billingAddress}`);
  doc.text(`Shipping Address: ${invoiceData.shippingAddress}`);
  doc.moveDown();

  // Table Header
  doc.text('Description', 50, 200);
  doc.text('Quantity', 250, 200);
  doc.text('Price', 350, 200);
  doc.text('Total', 450, 200);
  doc.moveDown();

  // Add each item to the invoice
  let yPosition = 220;
  invoiceData.items.forEach(item => {
    doc.text(item.description, 50, yPosition);
    doc.text(item.quantity, 250, yPosition);
    doc.text(`$${item.price.toFixed(2)}`, 350, yPosition);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 450, yPosition);
    yPosition += 20;
  });

  // Calculate the total amount
  const totalAmount = invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  doc.moveDown();
  doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, { align: 'right' });

  // Finalize the PDF
  doc.end();
};
const generateCertificate = (username, res) => {
    const doc = new PDFDocument({
      size: 'A4',
      layout: 'portrait',
      margin: 50
    });
  
    // Set the content type to PDF and set the content disposition
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=certificate_${username}.pdf`);
  
    // Pipe the PDF output to the response
    doc.pipe(res);
  
    // Title: Certificate Text
    doc.fontSize(24).text('Certificate of Achievement', { align: 'center' });
    doc.moveDown(1);
  
    // Certificate Body
    doc.fontSize(16).text(`This certifies that`, { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(20).text(`${username}`, { align: 'center', font: 'Helvetica-Bold' });
    doc.moveDown(1);
    doc.fontSize(16).text('Has successfully completed the course', { align: 'center' });
    doc.moveDown(2);
    
    // Additional text
    doc.fontSize(14).text('Issued by: Your Organization Name', { align: 'center' });
    doc.moveDown(1);
    doc.text('Date: ' + new Date().toLocaleDateString(), { align: 'center' });
  
    // Draw a border or signature line (Optional)
    doc.moveDown(3);
    doc.lineWidth(1).moveTo(50, 500).lineTo(550, 500).stroke(); // Horizontal line for signature
    doc.fontSize(12).text('Authorized Signature', 250, 510, { align: 'center' });
  
    // Finalize the PDF
    doc.end();
  };
  
module.exports={
    generateInvoice,
    generateCertificate
}