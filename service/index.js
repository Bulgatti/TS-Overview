const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const db = require('./db');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/temp', (req, res) => {
  db.query('SELECT * FROM product WHERE id=1', (err, product) => {
    if (err) {
      console.log(process.env);
      res.status(500).send(err);
    } else res.status(200).send(product);
  });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Service listening at http://localhost:${PORT}`);
