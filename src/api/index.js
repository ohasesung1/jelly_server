const api = require('express').Router();
const auth = require('./auth');
const notice = require('./notice');
const rcmnd = require('./rcmnd');
const member = require('./member');

api.use('/auth', auth);
api.use('/notice', notice);
api.use('/rcmnd', rcmnd);
api.use('/member', member);

module.exports = api;
