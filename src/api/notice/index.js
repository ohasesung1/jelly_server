const notice = require('express').Router();
const noticeCtrl = require('./notice.ctrl');
const upload = require('../../lib/upload');
const middleWareAuth = require('../../middleWare/auth');
const comment = require('./comment');
const like = require('./like');

notice.post('/', middleWareAuth, upload.array('file'), noticeCtrl.createNotice);
notice.get('/', noticeCtrl.getPost);
notice.delete('/',middleWareAuth, noticeCtrl.deletePost);
notice.put('/', middleWareAuth,upload.array('file'), noticeCtrl.modifyPost);

notice.use('/comment',middleWareAuth, comment);
notice.use('/like', middleWareAuth, like);

module.exports = notice;