const api = require('express').Router();
const auth = require('./auth');
const notice = require('./notice');
const rcmnd = require('./rcmnd');

api.use('/auth', auth);
api.use('/notice', notice);
api.use('/rcmnd', rcmnd);

module.exports = api;
