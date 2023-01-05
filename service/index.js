const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const router = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/loaderio-d149d4ff386a0467ebc838f6df271c3e', (req, res) => res.send('loaderio-d149d4ff386a0467ebc838f6df271c3e'));

app.use(router);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Service listening at http://localhost:${PORT}`);
