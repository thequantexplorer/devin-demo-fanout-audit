const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('places and cancels an order', async () => {
  const app = createApp();
  const placed = await request(app).post('/orders').send({ sku: 'SKU-1', qty: 2 });
  assert.strictEqual(placed.status, 201);
  const cancelled = await request(app).post(`/orders/${placed.body.id}/cancel`);
  assert.strictEqual(cancelled.body.status, 'cancelled');
});
