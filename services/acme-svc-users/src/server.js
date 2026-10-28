const { createApp } = require('./app');
const port = process.env.PORT || 4103;
createApp().listen(port, () => console.log('acme-svc-users listening on ' + port));
