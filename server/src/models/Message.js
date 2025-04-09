const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  doubt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doubt",
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
