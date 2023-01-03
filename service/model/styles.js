const db = require('../db');

const getStyles = async (product_id, cb) => {
  const data = { product_id };
  try {
    const styleData = await db.query(`SELECT id AS style_id, name, original_price, sale_price, default_style FROM style WHERE product_id = ${product_id}`);
    data.results = styleData.rows;
  } catch (err) {
    cb(err);
  }

  const photoQs = [];
  const skuQs = [];
  for (let i = 0; i < data.results.length; i += 1) {
    photoQs.push(db.query(`SELECT thumbnail_url, url FROM photo WHERE style_id = ${data.results[i].style_id}`));
    skuQs.push(db.query(`SELECT id, size, quantity FROM sku WHERE style_id = ${data.results[i].style_id}`));
  }

  try {
    const photoData = await Promise.all(photoQs);
    const skuData = await Promise.all(skuQs);

    for (let i = 0; i < data.results.length; i += 1) {
      const currentSKU = skuData[i].rows;
      const skus = {};
      for (let j = 0; j < currentSKU.length; j += 1) {
        skus[currentSKU[j].id] = { quantity: currentSKU[j].quantity, size: currentSKU[j].size };
      }
      data.results[i].photos = photoData[i].rows;
      data.results[i].skus = skus;
    }
  } catch (err) {
    cb(err);
  }

  cb(null, data);
};

module.exports = getStyles;
