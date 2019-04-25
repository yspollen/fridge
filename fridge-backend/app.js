const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const port = 4000;
const jwt = require("jsonwebtoken");
const itemRoutes = express.Router();
const cookieparser = require("cookie-parser");
const dbConnectionString = require('./config/keys').mongoURI;
const jwtSecret = require('./config/keys').jwtSecret;
const dbName = "fridge";
const auth = require('./middleware/middleware');

let Item = require("./models/item-model");
let User = require("./models/user-model");

app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());

mongoose.connect(dbConnectionString, {dbName: dbName});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.get("/", function(req, res){
  res.send("Hello World, this is the fridge app! (test message)");
});

app.get('/checkToken', auth, function(req, res) {
  res.sendStatus(200);
});

app.get("/users", function(req, res){
  User.find(function(err, fridge) {
    if (err) {
      console.log(err);
    } else {
      res.json(fridge);
    }
  });
});

app.post("/register", function(req, res){
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      var user = new User(req.body);
      user.save()
      .then(user => {
        res.status(200).json({'user': 'new user added to the db successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new user to fridge failed');
        console.log(err);
      });
    });
  });
});

//login
app.post("/login", function(req, res){
  var user = new User(req.body);
  console.log(user.email);
  User.findOne({username: user.username}, function(err, loguser){
  if(err){
    console.log(err);
  }else if(loguser == null){
    console.log("No user found with that email");
  }else{
    console.log(loguser);
    console.log(user);
    bcrypt.compare(user.password, loguser.password).then(function(result) {

      if(result==false){
        console.log("Incorrect Username or Password");
        res.status(400).json({ msg: 'Invalid credentials' });
      }else{
        console.log("success");
        const token = jwt.sign({email: loguser.email}, jwtSecret, {expiresIn: 3600});
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
      }
    }); 
  }
});
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
  Item.findOne({item_name: fridgeItem.item_name}, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (!result) {
      fridgeItem.save()
      .then(fridgeItem => {
        res.status(200).json({'item': 'new item added to the db successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new item to fridge failed');
        console.log(err);
      });
    } else {
      var newQuantity = fridgeItem.quantity ? fridgeItem.quantity : result.quantity;
      var newCalorie = fridgeItem.calorie_count ? fridgeItem.calorie_count : result.calorie_count;
      var newDate = fridgeItem.expiry_date ? fridgeItem.expiry_date : result.expiry_date;
      var newOwner = fridgeItem.owner ? fridgeItem.owner : result.owner;
      Item.findOneAndUpdate({item_name: fridgeItem.item_name}, {quantity: newQuantity, calorie_count: newCalorie, expiry_date: newDate, owner: newOwner})
      .then(fridgeItem => {
        res.status(200).json({'item': 'item updated successfully'});
      })
      .catch(err => {
        res.status(400).send('adding new item to fridge failed');
        console.log(err);
      });
    }
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
