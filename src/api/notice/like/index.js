const like = require('express').Router();
const likeCtrl = require('./like.ctrl');

like.post('/', likeCtrl.addLike);

module.exports = like;