const express = require('express');

const productsController = require('./controllers/productsController');

const app = express();
const port = 3000;

app.use(express.static('public')); //Static files from the public folder
app.get('/api/products', productsController.getAllProducts);

app.listen(port, () => console.log(`the server is running on http://localhost:${port}`));


