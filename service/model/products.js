const db = require('../db');

// const getProducts =

module.exports = {
  getProducts: db.query('SELECT * FROM product WHERE id=1'),
};
