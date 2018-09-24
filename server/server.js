const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const parser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.load();

app.use(parser.json());

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${ port }`);
});

const mapKey = process.env.MAP_KEY;
fetch(url, {
  headers: {
    'X-MAP-KEY': mapKey
    }
})
  .then(/* ... */);
