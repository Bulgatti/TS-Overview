/* eslint-disable no-param-reassign */
const db = require('../db');

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
