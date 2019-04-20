const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const itemRoutes = express.Router();
const dbConnectionString = require('./config/keys').mongoURI;
const dbName = "fridge";


let Item = require("./models/item-model");

app.use(cors());
app.use(bodyparser.json());


mongoose.connect(dbConnectionString, {dbName: dbName});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


app.get("/", function(req, res){
  res.send("Hello World, this is the fridge app! (test message)");
});

// middleware router
app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

// get all items in the db
itemRoutes.route('/').get(function(req, res) {
  Item.find(function(err, fridge) {
    if (err) {
      console.log(err);
    } else {
      res.json(fridge);
    }
  });
});

// add items to the db
itemRoutes.route('/add').post(function(req, res) {
  var fridgeItem = new Item(req.body);
  fridgeItem.save()
  .then(fridgeItem => {
    res.status(200).json({'item': 'new item added to the db successfully'});
  })
  .catch(err => {
    res.status(400).send('adding new item to fridge failed');
    console.log(err);
  });
});

// remove items from the db
itemRoutes.route('/remove').post(function(req, res) {
  var fridgeItem = new Item(req.body);
  Item.findOneAndRemove({item_name: fridgeItem.item_name})
  .then(fridgeItem => {
    res.status(200).json({'item': 'item removed from the db successfully'});
  })
  .catch(err => {
    res.status(400).send('removing item from fridge failed');
    console.log(err);
  });
});
