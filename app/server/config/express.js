const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const Config = require('../../config')
const Constants = require('../../constants')

const Headers = Constants.httpHeaders
const HeadersConfig = Config.server.headers
const Limits = Config.server.limits

require('./passport');
require('./mongoose');

const routes = require('../routes');
const passport = require('passport');

const app = express();

app.use(logger('dev'));

const distDir = '../../dist/front';

app.use(express.static(path.join(__dirname, distDir)));

app.use(express.json({ limit: Limits.json }));

app.use(express.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use(bodyParser.json({ limit: Limits.json }));

app.use(bodyParser.urlencoded({
    limit: Limits.urlEncoded,
    extended: true,
    parameterLimit: 50000
}));

app.use(helmet());

app.use(cors());

app.use(passport.initialize());

app.use('/api', routes);
app.use('*', (_, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
    res.setHeader(Headers.ContentSecutityPolicy, HeadersConfig.contentSecutityPolicy)
});

app.use((_, _, next) => {
    next(createError(404));
});

app.use((err, _, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
