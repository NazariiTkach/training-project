
const pool = require('./db'); 

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255)
      )
    `);

    await pool.query(`
      INSERT INTO products (name, price, image_url) VALUES
        ('Bamboo Watch', 65.00, 'bamboo-watch.jpg'),
        ('Black Watch', 72.00, 'black-watch.jpg'),
        ('Blue Band', 79.00, 'blue-band.jpg'),
        ('Blue T-Shirt', 29.00, 'blue-t-shirt.jpg'),
        ('Bracelet', 15.00, 'braclet.jpg')
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Products table created and data added');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
  } finally {
    await pool.end();
  }
}

initDB();