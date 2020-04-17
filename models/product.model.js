const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  image: String,
  description: String,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
