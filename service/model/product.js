const db = require('../db');

const getProduct = (product_id) => {
  const query = `SELECT json_build_object(
    'id', id,
    'name', name,
    'slogan', slogan,
    'description', description,
    'category', category,
    'default_price', default_price,
    'features', (SELECT json_agg(
      json_build_object(
        'feature', feature,
        'value', value
      )
    ) FROM feature WHERE product_id = ${product_id})
  ) FROM product WHERE id = ${product_id}`;

  return db.query(query);
};

module.exports = getProduct;
