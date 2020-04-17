const md5 = require('md5');
const User = require('../models/user.model');

module.exports.postLogin = async function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  let user = await User.findOne({ email: email });

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
