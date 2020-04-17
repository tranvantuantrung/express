const User = require('../models/user.model');
const md5 = require('md5');

module.exports.index = async function (req, res) {
  let users = await User.find();

  res.render('users/index.pug', {
    users: users,
  });
};

module.exports.search = async function (req, res) {
  let valueInput = req.query.input;

  let usersArr = await User.find();

  let usersFilter = usersArr.filter(function (user) {
    return (
      user.name.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1 ||
      user.phone.indexOf(valueInput) !== -1
    );
  });

  res.render('users/index.pug', {
    users: usersFilter,
    valueInput: valueInput,
  });
};

module.exports.create = function (req, res) {
  res.render('users/create.pug');
};

module.exports.viewUserById = async function (req, res) {
  let id = req.params.id;
  let userView = await User.findById(id);
  res.render('users/view', {
    userView: userView,
  });
};

module.exports.postCreate = function (req, res) {
  req.body.password = md5(req.body.password);
  if (req.file) {
    req.body.avatar = '/' + req.file.path.split('/').slice(1).join('/');
  }

  User.create(req.body);

  res.redirect('/users');
};
