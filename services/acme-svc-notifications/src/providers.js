const request = require('request');

const ENDPOINTS = {
  email: process.env.EMAIL_PROVIDER_URL || 'https://mail.acme.internal/send',
  sms: process.env.SMS_PROVIDER_URL || 'https://sms.acme.internal/send',
};

function deliver(channel, to, body) {
  if (process.env.PROVIDERS_FAKE !== '0') return Promise.resolve({ channel, to, queued: true });
  return new Promise((resolve, reject) => {
    request({ method: 'POST', url: ENDPOINTS[channel], json: { to, body }, timeout: 5000 }, (err, resp) => {
      if (err) return reject(err);
      resolve({ channel, to, queued: resp.statusCode < 300 });
    });
  });
}

module.exports = { deliver };
