const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('queues an email', async () => {
  const res = await request(createApp()).post('/send').send({ channel: 'email', to: 'a@b.co', body: 'hi' });
  assert.strictEqual(res.status, 202);
  assert.strictEqual(res.body.queued, true);
});
