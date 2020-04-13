const db = require('../db');

module.exports.postLogin = function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  let user = db.get('users').find({ email: email }).value();

  if (!user) {
    res.render('auth/login.pug', {
      errors: ['User does not exist!'],
      values: req.body,
    });
  }

  if (user.password !== password) {
    res.render('auth/login.pug', {
      errors: ['Wrong password'],
      values: req.body,
    });
  }

  res.locals.user = user;

  next();
};
