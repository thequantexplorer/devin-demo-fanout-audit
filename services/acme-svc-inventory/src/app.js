const express = require('express');
const rateLimit = require('express-rate-limit');

// Migrated off the deprecated `request` package to global fetch in v1.3 (INV-212).
const stock = new Map([['SKU-1', 10], ['SKU-2', 0]]);

function createApp() {
  const app = express();
  app.use(express.json());
  const limiter = rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false });

  app.get('/health', (req, res) => res.json({ ok: true }));
  app.get('/stock/:sku', (req, res) => res.json({ sku: req.params.sku, available: stock.get(req.params.sku) ?? 0 }));

  app.post('/reservations', limiter, (req, res) => {
    const { sku, qty } = req.body || {};
    const available = stock.get(sku) ?? 0;
    if (!Number.isInteger(qty) || qty < 1) return res.status(400).json({ error: 'qty required' });
    if (available < qty) return res.status(409).json({ error: 'insufficient stock', available });
    stock.set(sku, available - qty);
    res.status(201).json({ sku, qty, remaining: available - qty });
  });

  return app;
}

module.exports = { createApp };
