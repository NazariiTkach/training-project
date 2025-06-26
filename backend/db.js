const { Pool } = require('pg');

const pool = new Pool({
  user: 'macbook',          
  host: 'localhost',
  database: 'training_project_db',
  password: '',              
  port: 5432,
});

module.exports = pool;