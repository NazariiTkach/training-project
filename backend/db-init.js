const pool = require('./db');

async function initSchema() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(255)
      )
    `);
    console.log('✅ Schema created');
  } catch (err) {
    console.error('❌ Schema creation error:', err);
  }
}

async function seedData() {
  try {
    await pool.query(`
      INSERT INTO products (name, price, image_url) VALUES
        ('Bamboo Watch', 65.00, 'bamboo-watch.jpg'),
        ('Black Watch', 72.00, 'black-watch.jpg'),
        ('Blue Band', 79.00, 'blue-band.jpg'),
        ('Blue T-Shirt', 29.00, 'blue-t-shirt.jpg'),
        ('Bracelet', 15.00, 'braclet.jpg')
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample data inserted');
  } catch (err) {
    console.error('❌ Data insert error:', err);
  }
}

async function initDB() {
  await initSchema();
  await seedData();
  await pool.end();
}

initDB();
