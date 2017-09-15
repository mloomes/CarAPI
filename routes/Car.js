// Car.js
var mongoose = require('mongoose');  
var CarSchema = new mongoose.Schema({  
  make: String,
  model: String,
  year: String,
  value: String,
  mileage: String,
  transmission: String,
  colour: String
});
mongoose.model('Car', CarSchema);
module.exports = mongoose.model('Car');