const login = require('express').Router();
const loginCtrl = require('./loginCtrl.js');

login.post('/login', loginCtrl.check);

module.exports = login;