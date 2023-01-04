const model = require('../model');

const getStyles = (req, res) => {
  model.styles(req.params.product_id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
};

module.exports = getStyles;
