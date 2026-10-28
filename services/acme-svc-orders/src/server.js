const { createApp } = require('./app');
const port = process.env.PORT || 4102;
createApp().listen(port, () => console.log('acme-svc-orders listening on ' + port));
