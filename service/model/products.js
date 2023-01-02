const db = require('../db');

const getProducts = async (page = 1, count = 5, cb) => {
  try {
    const data = await db.query(`SELECT * FROM product WHERE id > ${(page - 1) * count} LIMIT ${count}`);
    cb(null, data.rows);
  } catch (err) {
    cb(err);
  }
};

module.exports = getProducts;
