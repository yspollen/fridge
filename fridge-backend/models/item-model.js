const mongoose = require("mongoose");

let Item = new mongoose.Schema({
  item_name: {
    type: String
  }
});

module.exports = mongoose.model('Item', Item);
