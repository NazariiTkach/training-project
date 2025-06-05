const pool = require('./backend/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ DB connection error:', err);
  } else {
    console.log('✅ Connected to PostgreSQL:', res.rows[0]);
  }
  pool.end();
});