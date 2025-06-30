const fetch = require('node-fetch'); 

const API_URL = 'https://685d8113769de2bf0860e4b1.mockapi.io/products';

// Create product
async function createProduct(req, res) {
  const { name, price, imageUrl = '' } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, imageUrl }),
    });

    if (!response.ok) throw new Error('Failed to create product');

    const product = await response.json();
    res.status(201).json(product);
  } catch (error) {
    handleDbError(res, 'Failed to create product', error);
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch products');

    const products = await response.json();
    res.json(products);
  } catch (error) {
    handleDbError(res, 'Failed to fetch products', error);
  }
}

// Delete product
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const deletedProduct = await response.json();
    res.status(200).json({ message: 'Product deleted', product: deletedProduct });
  } catch (error) {
    handleDbError(res, 'Failed to delete product', error);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
