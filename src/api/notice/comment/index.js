const comment  = require('express').Router();
const commentCtrl = require('./comment.ctrl');

comment.post('/', commentCtrl.writeComment);
comment.get('/', commentCtrl.getComment);
comment.delete('/', commentCtrl.deleteComment);
comment.put('/', commentCtrl.updateComment);

module.exports = comment;