const db = require('../db');

// const getStyles = async (product_id, cb) => {
//   const data = { product_id };
//   try {
//     const styleData = await db.query(`SELECT id AS style_id, name, original_price, sale_price, default_style FROM style WHERE product_id = ${product_id}`);
//     data.results = styleData.rows;
//   } catch (err) {
//     cb(err);
//   }

//   const photoQs = [];
//   const skuQs = [];
//   for (let i = 0; i < data.results.length; i += 1) {
//     photoQs.push(db.query(`SELECT thumbnail_url, url FROM photo WHERE style_id = ${data.results[i].style_id}`));
//     skuQs.push(db.query(`SELECT id, size, quantity FROM sku WHERE style_id = ${data.results[i].style_id}`));
//   }

//   try {
//     const photoData = await Promise.all(photoQs);
//     const skuData = await Promise.all(skuQs);

//     for (let i = 0; i < data.results.length; i += 1) {
//       const currentSKU = skuData[i].rows;
//       const skus = {};
//       for (let j = 0; j < currentSKU.length; j += 1) {
//         skus[currentSKU[j].id] = { quantity: currentSKU[j].quantity, size: currentSKU[j].size };
//       }
//       data.results[i].photos = photoData[i].rows;
//       data.results[i].skus = skus;
//     }
//   } catch (err) {
//     cb(err);
//   }

//   cb(null, data);
// };

const getStyles = async (product_id) => {
  const query = `SELECT json_build_object(
    'product_id', ${product_id},
    'results', (SELECT json_agg(
      json_build_object(
        'style_id', id,
        'name', name,
        'original_price', original_price,
        'sale_price', sale_price,
        'default?', default_style,
        'photos', (SELECT json_agg(
          json_build_object(
            'thumbnail_url', thumbnail_url,
            'url', url
          )
        ) FROM photo WHERE style_id = style.id),
        'skus', (SELECT json_object_agg(
          id, json_build_object(
            'quanity', quantity,
            'size', size
          )
        ) FROM sku WHERE style_id = style.id)
      )
    ) FROM style WHERE product_id = ${product_id})
  )`;

  try {
    let data = await db.query(query);
    data = data.rows[0].json_build_object;
    const styles = data.results;
    styles.forEach((style) => {
      if (!style.photos) {
        style.photos = [{ thumbnail_url: null, url: null }];
      }
      if (!style.skus) {
        style.skus = { null: { quantity: null, size: null } };
      }
    });
    return data;
  } catch (err) {
    return err;
  };
};

module.exports = getStyles;
