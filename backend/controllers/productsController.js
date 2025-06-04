const pool = require('../db');


async function getAllProducts(req, res) {
    try {
      const result = await pool.query('SELECT name, price, image_url FROM products');
      res.json(result.rows);
    } catch (error) {
      console.error('DB error:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
  
  module.exports = { getAllProducts };