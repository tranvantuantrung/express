const md5 = require('md5');

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

  let hashedPassword = md5(password);

  if (user.password !== hashedPassword) {
    res.render('auth/login.pug', {
      errors: ['Wrong password'],
      values: req.body,
    });
  }

  res.locals.user = user;

  next();
};
