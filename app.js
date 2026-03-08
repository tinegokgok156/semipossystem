const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/items', (req, res) => {
    fs.readFile(path.join(__dirname, 'items', 'example.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading items file');
        res.send(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`POS system running at http://localhost:${PORT}`);
});
