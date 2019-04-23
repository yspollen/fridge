const mongoose = require("mongoose");

let Item = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  expiry_date: {
    type: Date,
  },
  calorie_count: {
    type: Number,
  },
  owner: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  }
});

var itemModel = mongoose.model('Item', Item);
module.exports = itemModel;
