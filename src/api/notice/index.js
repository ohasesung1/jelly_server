const notice = require('express').Router();
const noticeCtrl = require('./notice.ctrl');
const upload = require('../../lib/upload');
const middleWareAuth = require('../../middleWare/auth');
const comment = require('./comment');

notice.post('/', middleWareAuth, upload.array('file'), noticeCtrl.createNotice);
notice.get('/', noticeCtrl.getPost);
notice.delete('/',middleWareAuth, noticeCtrl.deletePost);

notice.use('/comment',middleWareAuth, comment);

module.exports = notice;