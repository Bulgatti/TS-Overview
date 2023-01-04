const db = require('../db');

const getProducts = async (page = 1, count = 5) => {
  const query = `SELECT * FROM product WHERE id > ${(page - 1) * count} LIMIT ${count}`;

  return db.query(query);
};

module.exports = getProducts;
