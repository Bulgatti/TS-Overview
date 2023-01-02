const model = require('../model');

const getProducts = (req, res) => {

  model.products.getProducts
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};

module.exports = getProducts;
