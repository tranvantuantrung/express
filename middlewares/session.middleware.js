const Session = require('../models/session.model');

module.exports = async function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    let newSession = await Session.create({});

    res.cookie('sessionId', newSession.id, {
      signed: true,
    });
  }

  let session = await Session.findById(req.signedCookies.sessionId);
  let countProduct = 0;

  if (session) {
    for (let product of session.cart) {
      countProduct += product.quantity;
    }
  }

  res.locals.countProduct = countProduct;

  next();
};
