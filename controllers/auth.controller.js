const db = require('../db');

module.exports.login = function (req, res) {
  res.render('auth/login.pug');
};

module.exports.postLogin = function (req, res) {
  res.cookie('userId', res.locals.user.id);
  res.redirect('/');
};
