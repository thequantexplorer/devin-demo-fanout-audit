const { createApp } = require('./app');
const port = process.env.PORT || 4104;
createApp().listen(port, () => console.log('acme-svc-notifications listening on ' + port));
