const member = require('express').Router();
const memberCtrl = require('./member.ctrl');
const middleWareAuth = require('../../middleWare/auth');

member.get('/',middleWareAuth, memberCtrl.getmemberData);

module.exports = member;