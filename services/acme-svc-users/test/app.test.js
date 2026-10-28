const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('logs in with valid credentials', async () => {
  const res = await request(createApp()).post('/login').send({ email: 'ada@acme.dev', password: 'correct-horse' });
  assert.strictEqual(res.status, 200);
  assert.ok(res.body.token);
});

test('rejects a bad password', async () => {
  const res = await request(createApp()).post('/login').send({ email: 'ada@acme.dev', password: 'nope' });
  assert.strictEqual(res.status, 401);
});
