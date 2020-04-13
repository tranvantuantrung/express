const express = require('express');

const router = express.Router();
const controller = require('../controllers/auth.controller');
const validation = require('../validation/auth.validation');

router.get('/login', controller.login);
router.post('/login', validation.postLogin, controller.postLogin);

module.exports = router;
