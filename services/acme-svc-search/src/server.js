const { createApp } = require('./app');
const port = process.env.PORT || 4105;
createApp().listen(port, () => console.log('acme-svc-search listening on ' + port));
