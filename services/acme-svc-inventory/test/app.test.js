const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('reserves stock', async () => {
  const res = await request(createApp()).post('/reservations').send({ sku: 'SKU-1', qty: 3 });
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.remaining, 7);
});

test('refuses to oversell', async () => {
  const res = await request(createApp()).post('/reservations').send({ sku: 'SKU-2', qty: 1 });
  assert.strictEqual(res.status, 409);
});
