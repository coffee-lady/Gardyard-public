const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('./passport');
require('./mongoose');

const routes = require('../routes/index.route');
const passport = require('passport');

const app = express();

app.use(logger('dev'));

const distDir = '../../dist/front';
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
    res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use('/api/', routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
