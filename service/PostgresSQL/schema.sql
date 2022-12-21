DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS product {
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT NOT NULL,
  default_price INTEGER NOT NULL
};

CREATE TABLE IF NOT EXISTS feature {
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id),
  feature TEXT NOT NULL,
  value TEXT
};

CREATE TABLE IF NOT EXISTS style {
  id SERIAL PRIMARY KEY,
  productId INTEGER REFERENCES product(id),
  name TEXT NOT NULL,
  sale_price INTEGER,
  original_price INTEGER NOT NULL,
  default_style BOOLEAN NOT NULL
};

CREATE TABLE IF NOT EXISTS photo {
  id SERIAL PRIMARY KEY,
  styleId INTEGER REFERENCES style(id),
  url TEXT,
  thumbnail_url TEXT
};

CREATE TABLE IF NOT EXISTS sku {
  id SERIAL PRIMARY KEY,
  styleId INTEGER REFERENCES style(id),
  size TEXT,
  quantity INTEGER
};

CREATE TABLE IF NOT EXISTS related {
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER REFERENCES product(id),
  related_product_id INTEGER NOT NULL
};