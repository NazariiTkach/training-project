const { Pool } = require('pg');

const pool = new Pool({
  user: 'macbook',           // або інше ім’я твого macOS користувача
  host: 'localhost',
  database: 'training_project_db',
  password: '',              // якщо немає — залишай порожнім
  port: 5432,
});

module.exports = pool;