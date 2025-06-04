const express = require('express');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const productsController = require('./controllers/productsController');

const app = express();
const port = 3000;

// 🔁 LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/public");

app.use(connectLivereload());
app.use(express.static('public')); // Статичні файли з папки public
app.get('/api/products', productsController.getAllProducts);

app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
});
  
