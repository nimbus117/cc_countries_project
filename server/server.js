const express = require('express');
const app = express();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const parser = require('body-parser');
const fetch = require('node-fetch');

app.use(parser.json());

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.get('/wikipedia/:country', (req, res) => {
  const countryName = req.params.country
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${countryName}`
  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
})

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
