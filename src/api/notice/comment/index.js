const comment  = require('express').Router();
const commentCtrl = require('./comment.ctrl');

comment.post('/', commentCtrl.writeComment);

module.exports = comment;