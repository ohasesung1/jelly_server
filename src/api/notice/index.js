const notice = require('express').Router();
const noticeCtrl = require('./notice.ctrl');
const upload = require('../../lib/upload');

notice.post('/', upload.array('file'), noticeCtrl.createNotice);
notice.get('/', noticeCtrl.getPost);
notice.delete('/', noticeCtrl.deletePost);

module.exports = notice;