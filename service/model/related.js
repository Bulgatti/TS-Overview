const db = require('../db');

const getRelated = async (product_id, cb) => {
  try {
    const relatedData = await db.query(`SELECT related_product_id from related where current_product_id = ${product_id}`);
    const data = relatedData.rows.map((product) => product.related_product_id);
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};

module.exports = getRelated;
