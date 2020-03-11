const rcmnd = require('express').Router();
const rcmndCtrl = require('./rcmnd.ctrl');

rcmnd.get('/', rcmndCtrl.rcmndShow);

module.exports = rcmnd;