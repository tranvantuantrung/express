const express = require('express');
const multer = require('multer');

const controller = require('../controllers/user.controller');
const validation = require('../validation/users.validation');

const router = express.Router();
const upload = multer({ dest: './public/uploads/' });

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.viewUserById);

router.post(
  '/create',
  upload.single('avatar'),
  validation.postCreate,
  controller.postCreate
);

module.exports = router;
