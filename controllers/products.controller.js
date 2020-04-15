const db = require('../db');

module.exports.index = function (req, res) {
  let page = req.query.page ? parseInt(req.query.page) : 1;
  let perPage = 8;

  let begin = (page - 1) * perPage;
  let end = begin + perPage;
  let products = db.get('products').value();

  if (req.signedCookies.userId) {
    let user = db.get('users').find({ id: req.signedCookies.userId }).value();
    if (user) {
      res.locals.user = user;
    }
  }

  res.render('products/products.pug', {
    products: products.slice(begin, end),
    lengthPage: Math.ceil(products.length / perPage),
    page: page,
  });
};
