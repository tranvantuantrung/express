const shortId = require('shortid');

const db = require('../db');

module.exports = function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    let sessionId = shortId.generate();
    res.cookie('sessionId', sessionId, {
      signed: true,
    });
    db.get('sessions').push({ id: sessionId }).write();
  }

  let cart = db
    .get('sessions')
    .find({ id: req.signedCookies.sessionId })
    .get('cart', {})
    .value();

  let coutProduct = 0;

  for (let product in cart) {
    coutProduct += cart[product];
  }

  res.locals.coutProduct = coutProduct;

  next();
};
