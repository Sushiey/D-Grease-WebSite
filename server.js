const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  


app.set('views', path.join(__dirname, 'views'));


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/products', (req, res) => {
  res.render('products');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});