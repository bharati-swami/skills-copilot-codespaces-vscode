// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) throw err;
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) throw err;
    });
    res.send(comments);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});