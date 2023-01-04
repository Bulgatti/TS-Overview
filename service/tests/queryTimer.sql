\timing

\c products;

SELECT * FROM product WHERE id > 0 LIMIT 5;


SELECT json_build_object(
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
  ) FROM feature WHERE product_id = 1)
) FROM product WHERE id = 1;


SELECT json_build_object(
  'product_id', 1,
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
  ) FROM style WHERE product_id = 1)
);


SELECT json_agg(related_product_id) from related where current_product_id = 1;

\timing