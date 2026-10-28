const { createApp } = require('./app');
const port = process.env.PORT || 4106;
createApp().listen(port, () => console.log('acme-svc-inventory listening on ' + port));
