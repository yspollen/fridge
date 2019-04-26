const mongoose = require("mongoose");

let Item = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  expiry_date: {
    type: Date,
    required: true
  },
  calorie_count: {
    type: Number,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

var itemModel = mongoose.model('Item', Item);
module.exports = itemModel;
