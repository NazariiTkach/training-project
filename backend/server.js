const express = require('express');
const productsRouter = require('./routes/products');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
app.use(express.static('public')); //Static files from the public folder
app.use('/api/products', productsRouter);

app.listen(port, () => console.log(`the server is running on http://localhost:${port}`));


