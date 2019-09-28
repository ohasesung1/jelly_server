const api = require('express').Router();
const auth = require('./auth');
const notice = require('./notice');
const middleWareAuth = require('../middleWare/auth');

api.use('/auth', auth);
api.use('/notice', middleWareAuth, notice);

module.exports = api;
