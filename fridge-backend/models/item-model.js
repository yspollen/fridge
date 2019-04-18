const mongoose = require("mongoose");

let Item = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  expiry_date: {
    type: Date,
    default: Date.now
  },
  calorie_count: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Item', Item);
