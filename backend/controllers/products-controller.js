const pool = require('../db');

// Error handling function
function handleDbError(res, message, error) {
  console.error(message, error);
  res.status(500).json({ error: message });
}

// Product creation
async function createProduct(req, res) {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO products(name, price, image_url) VALUES ($1, $2, $3) RETURNING *',
      [name, price, ''] 
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    handleDbError(res, 'Failed to create product', error);
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    handleDbError(res, 'Failed to fetch products', error);
  }
}

// Product delete
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted', product: result.rows[0] });
  } catch (error) {
    handleDbError(res, 'Failed to delete product', error);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
