const login = require('express').Router();
const loginCtrl = require('./login.ctrl.js');

login.post('/login', loginCtrl.check);
login.post('/signUp', loginCtrl.signUp);

module.exports = login;