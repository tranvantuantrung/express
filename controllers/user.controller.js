const md5 = require('md5');

const db = require('../db');
const shortid = require('shortid');

module.exports.index = function (req, res) {
  res.render('users/index.pug', {
    users: db.get('users').value(),
  });
};

module.exports.search = function (req, res) {
  let valueInput = req.query.input;
  let inputFilter = db
    .get('users')
    .value()
    .filter(function (user) {
      return (
        user.name.toLowerCase().indexOf(valueInput.toLowerCase()) !== -1 ||
        user.phone.indexOf(valueInput) !== -1
      );
    });

  res.render('users/index.pug', {
    users: inputFilter,
    valueInput: valueInput,
  });
};

module.exports.create = function (req, res) {
  res.render('users/create.pug');
};

module.exports.viewUserById = function (req, res) {
  let id = req.params.id;
  let user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: user,
  });
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate();
  req.body.password = md5(req.body.password);

  db.get('users').push(req.body).write();
  res.redirect('/users');
};
