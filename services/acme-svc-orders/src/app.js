const express = require('express');
const rateLimit = require('express-rate-limit');

const orders = new Map();
let seq = 1000;

function createApp() {
  const app = express();
  app.use(express.json());

  const writeLimiter = rateLimit({ windowMs: 60_000, limit: 30, standardHeaders: 'draft-7', legacyHeaders: false });

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.post('/orders', writeLimiter, (req, res) => {
    const { sku, qty } = req.body || {};
    if (!sku || !Number.isInteger(qty) || qty < 1) return res.status(400).json({ error: 'sku and qty required' });
    const order = { id: String(++seq), sku, qty, status: 'placed' };
    orders.set(order.id, order);
    res.status(201).json(order);
  });

  // Added in the v1.4 "self-serve cancellations" release.
  app.post('/orders/:id/cancel', (req, res) => {
    const order = orders.get(req.params.id);
    if (!order) return res.status(404).json({ error: 'not found' });
    order.status = 'cancelled';
    res.json(order);
  });

  app.get('/orders/:id', (req, res) => {
    const order = orders.get(req.params.id);
    if (!order) return res.status(404).json({ error: 'not found' });
    res.json(order);
  });

  return app;
}

module.exports = { createApp };
