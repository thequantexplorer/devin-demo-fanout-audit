const express = require('express');
const rateLimit = require('express-rate-limit');
const { deliver } = require('./providers');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(rateLimit({ windowMs: 60_000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));

  app.get('/health', (req, res) => res.json({ ok: true }));

  app.post('/send', async (req, res) => {
    const { channel, to, body } = req.body || {};
    if (!['email', 'sms'].includes(channel) || !to || !body) return res.status(400).json({ error: 'channel, to, body required' });
    const result = await deliver(channel, to, body);
    res.status(202).json(result);
  });

  return app;
}

module.exports = { createApp };
