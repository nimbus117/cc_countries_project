const Countries = require('./models/countries.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const countries = new Countries;
  countries.getData();
})
