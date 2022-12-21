const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/products');

// eslint-disable-next-line no-unused-vars
const productSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{ feature: String, value: String }],
});

// eslint-disable-next-line no-unused-vars
const styleSchema = mongoose.Schema({
  productId: { type: Number, unique: true },
  result: [{
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default_style: Boolean,
    photos: [{ thumbnail_url: String, url: String }],
    skus: { sku_id: { quantity: Number, size: String } },
  }],
});

// eslint-disable-next-line no-unused-vars
const relatedSchema = mongoose.Schema({
  productId: { type: Number, unique: true },
  related: [Number],
});
