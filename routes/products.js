const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(products);
});

router.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newProduct = req.body;
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);

  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

module.exports = router;
