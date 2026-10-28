const express = require('express');
const crypto = require('crypto');

const users = new Map([['ada@acme.dev', { email: 'ada@acme.dev', hash: hash('correct-horse') }]]);
const resetTokens = new Map();

function hash(pw) {
  return crypto.createHash('sha256').update(pw).digest('hex');
}

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.post('/login', (req, res) => {
    const { email, password } = req.body || {};
    const user = users.get(email);
    if (!user || user.hash !== hash(password || '')) return res.status(401).json({ error: 'invalid credentials' });
    res.json({ token: crypto.randomBytes(16).toString('hex') });
  });

  app.post('/password-reset', (req, res) => {
    const { email } = req.body || {};
    if (users.has(email)) resetTokens.set(email, crypto.randomBytes(16).toString('hex'));
    res.status(202).json({ ok: true });
  });

  return app;
}

module.exports = { createApp };
