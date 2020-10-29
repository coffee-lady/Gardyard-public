const config = require('./config/config');
const app = require('./config/express');
require('./config/mongoose');

if (!module.parent) {
    app.listen(5000, '0.0.0.0', () => {
        console.info(`server started on port ${config.port} (${config.env})`);
    });
}

module.exports = app;
