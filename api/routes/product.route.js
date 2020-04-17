const express = require('express');

const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', controller.index);
router.get('/:id', controller.viewProduct);
router.post('/', controller.postCreate);
router.put('/:id', controller.putProduct);
router.patch('/:id', controller.patchProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
