const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static('public'));
app.use(express.json());

// Serve the main POS page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve items JSON
app.get('/items', (req, res) => {
  fs.readFile(path.join(__dirname, 'items', 'example.json'), 'utf8', (err, data) => {
