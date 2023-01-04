const db = require('../db');

const getRelated = async (product_id) => {
  const query = `SELECT json_agg(related_product_id) from related where current_product_id = ${product_id}`;

  return db.query(query);
};

module.exports = getRelated;
