const model = require('../model');

const getProduct = (req, res) => {
  model.product(req.params.product_id)
    .then((data) => res.status(200).send(data.rows[0].json_build_object))
    .catch((err) => res.status(500).send(err));
};

module.exports = getProduct;
