/**
 * Database Service — PostgreSQL (AWS RDS) via node-postgres (pg).
 *
 * TODO: Uncomment the real Pool configuration once AWS RDS is provisioned
 * and DATABASE_URL is added to your .env file.
 */

// TODO: Uncomment when RDS is available.
// const { Pool } = require('pg');
//
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }, // Required for AWS RDS
// });
//
// pool.on('error', (err) => {
//   console.error('Unexpected DB client error:', err);
//   process.exit(-1);
// });
//
// module.exports = {
//   query: (text, params) => pool.query(text, params),
//   pool,
// };

// STUB — remove when RDS is available
const db = {
  query: async (text, params) => {
    console.warn('[db] STUB: query called but RDS is not yet provisioned.');
    console.warn('[db] SQL:', text);
    console.warn('[db] Params:', params);
    return { rows: [], rowCount: 0 };
  },
};

module.exports = db;
