const model = require('../model');

const getProducts = (req, res) => {
  model.products(req.query.page, req.query.count)
    .then((data) => res.status(200).send(data.rows))
    .catch((err) => res.status(500).send(err));
};

module.exports = getProducts;
