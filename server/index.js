const express = require('express');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const { buildDB, testDB } = require('./db/seed.js');

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static(path.join(__dirname, '../build')));
server.use(express.json());

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);