const db = require('../db');

const getProduct = async (product_id, cb) => {
  try {
    const productData = await db.query(`SELECT * FROM product WHERE id = ${product_id}`);
    const featureData = await db.query(`SELECT feature, value FROM feature where product_id = ${product_id}`);
    const data = productData.rows[0];
    data.features = featureData.rows;
    cb(null, data);
  } catch (err) {
    cb(err);
  }
};

module.exports = getProduct;
