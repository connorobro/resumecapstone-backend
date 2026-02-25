const jwt = require('jsonwebtoken');
// TODO: import bcryptjs and db when RDS is provisioned
// const bcrypt = require('bcryptjs');
// const db = require('../services/db');

/**
 * POST /auth/register
 * Stub — real implementation requires RDS.
 * Expected body: { username, password }
 */
async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    // TODO: hash password with bcrypt
    // const passwordHash = await bcrypt.hash(password, 10);

    // TODO: insert user into DB
    // const result = await db.query(
    //   'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
    //   [username, passwordHash]
    // );
    // const user = result.rows[0];

    // STUB response — remove when DB is available
    const user = { id: 1, username, created_at: new Date().toISOString() };

    return res.status(201).json({ message: 'User created (stub)', user });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * POST /auth/login
 * Stub — real implementation requires RDS.
 * Expected body: { username, password }
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    // TODO: look up user in DB
    // const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    // if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    // const user = result.rows[0];

    // TODO: verify password with bcrypt
    // const match = await bcrypt.compare(password, user.password_hash);
    // if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // STUB user — remove when DB is available
    const user = { id: 1, username };

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'stub_secret',
      { expiresIn: '7d' }
    );

    return res.json({ message: 'Login successful (stub)', token });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { register, login };
