const express = require('express');
const catalog = require('./catalog.json');

function createApp() {
  const app = express();
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.get('/search', (req, res) => {
    const q = String(req.query.q || '').toLowerCase();
    const hits = catalog.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 20);
    res.json({ q, hits });
  });
  return app;
}

module.exports = { createApp };
