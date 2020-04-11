const express = require('express');
const shortid = require('shortid');

const db = require('../db');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('users/index.pug', {
    users: db.get('users').value(),
  });
});

router.get('/search', function (req, res) {
  let nameSearch = req.query.name;
  let nameFilter = db
    .get('users')
    .value()
    .filter(function (user) {
      return user.name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1;
    });

  res.render('users/index.pug', {
    users: nameFilter,
    nameSearch: nameSearch,
  });
});

router.get('/create', function (req, res) {
  res.render('users/create.pug');
});

router.post('/create', function (req, res) {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  let user = db.get('users').find({ id: id }).value();
  res.render('users/view', {
    user: user,
  });
});

module.exports = router;
