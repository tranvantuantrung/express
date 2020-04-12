const express = require('express');

const router = express.Router();
const controller = require('../controllers/user.controller');
const validation = require('../validation/users.validation');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.viewUserById);

router.post('/create', validation.postCreate, controller.postCreate);

module.exports = router;
