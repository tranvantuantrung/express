const Session = require('../models/session.model');

module.exports.addToCart = async function (req, res) {
  let productId = req.params.productId;
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  let session = await Session.findById(sessionId);

  let productPurchased = session.cart.find(function (item) {
    return item.product.toString() === productId;
  });

  if (productPurchased) {
    productPurchased.quantity += 1;
    session.save();
  } else {
    await Session.findByIdAndUpdate(sessionId, {
      $push: { cart: { product: productId, quantity: 1 } },
    });
  }

  res.redirect('/products');
};
