const crypto = require('crypto');

function generateOTP() {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let otp = '';
  // Loop 6 times to generate a 6-character OTP
  for (let i = 0; i < 6; i++) {
    // Generate a random index based on the length of the characters string
    const randomIndex = crypto.randomInt(0, characters.length);
    otp += characters.charAt(randomIndex);
  }
  return otp;
}

// Example usage:
console.log('Generated OTP:', generateOTP());
