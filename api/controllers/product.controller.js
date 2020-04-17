const Product = require('../../models/product.model');

module.exports.index = async function (req, res) {
  let products = await Product.find();

  res.json(products);
};

module.exports.postCreate = async function (req, res) {
  let product = await Product.create(req.body);

  res.json(product);
};

module.exports.viewProduct = async function (req, res) {
  let id = req.params.id;

  let product = await Product.findById(id);

  res.json(product);
};

module.exports.putProduct = async function (req, res) {
  let id = req.params.id;

  let product = await Product.findByIdAndUpdate(req.body);

  if (!product) {
    await Product.create(req.body);
  }

  res.json(product);
};

module.exports.putProduct = async function (req, res) {
  let id = req.params.id;

  let product = await Product.findByIdAndUpdate(id, req.body);

  if (!product) {
    await Product.create(req.body);
  }

  res.json(product);
};

module.exports.patchProduct = async function (req, res) {
  let id = req.params.id;

  let product = await Product.findByIdAndUpdate(id, req.body);

  res.json(product);
};

module.exports.deleteProduct = async function (req, res) {
  let id = req.params.id;

  let product = await Product.findByIdAndDelete(id);

  res.json(product);
};
