const axios = require('axios');

const URL = 'http://localhost:3030';

describe('/products retrieves a list of products', () => {
  test('gets 5 products with no query params', () => {
    axios.get(`${URL}/products`)
      .then((res) => expect(res.data.length).toBe(5))
      .catch((err) => { throw (err); });
  });

  test('gets 100 products with query param count=100', () => {
    axios.get(`${URL}/products/?count=100`)
      .then((res) => expect(res.data.length).toBe(100))
      .catch((err) => { throw (err); });
  });
});

describe('/products/:product_id Return product info including features', () => {
  test('return all product info with features of product', () => {
    axios.get(`${URL}/products/1`)
      .then((res) => {
        const product = res.data;
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.slogan).toBeTruthy();
        expect(product.description).toBeTruthy();
        expect(product.category).toBeTruthy();
        expect(product.default_price).toBeTruthy();
        expect(product.features).toBeTruthy();
      })
      .catch((err) => { throw (err); });
  });
});

describe('/products/:product_id/styles Return styles of a product including photos and skus', () => {
  test('return all style, photo, and sku info of a product', () => {
    axios.get(`${URL}/products/1/styles`)
      .then((res) => {
        const style = res.data.results[0];
        expect(style.style_id).toBeTruthy();
        expect(style.name).toBeTruthy();
        expect(style.original_price).toBeTruthy();
        expect(style.sale_price).toBeTruthy();
        expect(style.photos).toBeTruthy();
        expect(style.skus).toBeTruthy();
      })
      .catch((err) => { throw (err); });
  });
});

describe('/products/:product_id/related Return related product ids', () => {
  test('return array of related product IDs', () => {
    axios.get(`${URL}/products/1/related`)
      .then((res) => {
        const related = res.data;
        expect(Array.isArray(related)).toBeTruthy();
      })
      .catch((err) => { throw (err); });
  });
});
