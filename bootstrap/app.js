const express    = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const Handler    = require('../app/Exceptions/Handler');

/* create express app */
const app = express();

/* use body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* console log api */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

/* routes */
app.use('/v1/api', require('../routes/api'));

/* connect to database */
require('../database/connections').default;

/* handle exceptions */
app.use(Handler);

module.exports = app;
