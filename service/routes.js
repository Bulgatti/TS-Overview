const router = require('express').Router();
const controller = require('./controller');

router.get('/products', controller.products);

router.get('/products/:product_id', controller.product);

router.get('/products/:product_id/styles', controller.styles);

router.get('/products/:product_id/related', controller.related);

module.exports = router;
