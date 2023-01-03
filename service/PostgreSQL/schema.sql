DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS feature (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id),
  feature TEXT NOT NULL,
  value TEXT
);

CREATE TABLE IF NOT EXISTS style (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id),
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS photo (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES style(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS sku (
  id SERIAL PRIMARY KEY,
  style_id INTEGER REFERENCES style(id),
  size TEXT,
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES product(id),
  related_product_id INTEGER NOT NULL
);

CREATE INDEX product_index ON product(id);
CREATE INDEX feature_index ON feature(product_id);
CREATE INDEX style_index ON style(product_id);
CREATE INDEX photo_index ON photo(style_id);
CREATE INDEX sku_index ON sku(style_id);
CREATE INDEX related_index ON related(current_product_id);

\COPY product FROM '../data/product.csv' DELIMITER ',' CSV HEADER;
\COPY feature FROM '../data/features.csv' DELIMITER ',' CSV HEADER;
\COPY style FROM '../data/styles.csv' DELIMITER ',' CSV HEADER;
\COPY photo FROM '../data/photos.csv' DELIMITER ',' CSV HEADER;
\COPY sku FROM '../data/skus.csv' DELIMITER ',' CSV HEADER;
\COPY related FROM '../data/related.csv' DELIMITER ',' CSV HEADER;