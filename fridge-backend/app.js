var express = require("express");
var app = express();
var port = 8080;
// var MongoClient = require("mongodb").MongoClient

app.get("/", function(req, res){
  res.send("Hello World, this is the fridge app! (test message)");
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
