const login = require('express').Router();
const loginCtrl = require('./login.ctrl.js');

login.post('/login', loginCtrl.check);

module.exports = login;