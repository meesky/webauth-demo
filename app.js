const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const crypto = require('crypto');

const config = require('./config.json');
const webuathnauth = require('./server/webauthn.js');

const app = express();

app.use(bodyParser.json());

/* ----- session ----- */
app.use(
    cookieSession({
        name: 'session',
        keys: [crypto.randomBytes(32).toString('hex')],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);
app.use(cookieParser());

/* ----- serve static ----- */
app.use(express.static(path.join(__dirname, 'static')));

app.use('/webauthn', webuathnauth);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Started app on port ${port}`);

module.exports = app;
