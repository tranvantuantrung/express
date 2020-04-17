const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: String,
  image: String,
  description: String,
});

let Product = mongoose.model('products', productSchema);

module.exports = Product;
