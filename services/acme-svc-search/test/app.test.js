const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const { createApp } = require('../src/app');

test('finds products by substring', async () => {
  const res = await request(createApp()).get('/search?q=trail');
  assert.strictEqual(res.body.hits.length, 2);
});
