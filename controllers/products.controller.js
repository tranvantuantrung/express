const Product = require('../models/product.model');
const User = require('../models/user.model');

module.exports.index = async function (req, res) {
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = 8;

  let begin = (page - 1) * perPage;
  let end = begin + perPage;

  if (req.signedCookies.userId) {
    let user = await User.findById(req.signedCookies.userId);

    if (user) {
      res.locals.user = user;
    }
  }

  let products = await Product.find();

  let lengthPage = Math.ceil(products.length / perPage);

  res.render('products/products.pug', {
    products: products.slice(begin, end),
    lengthPage: lengthPage,
    page: page,
  });
};
