const Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
  let products = await Product.find();

  res.json(products);
};
