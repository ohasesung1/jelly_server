const models = require('../../models');
const file = require('../../lib/file');

exports.createNotice = async (req, res) => {
  const {title, description, fileId } = req.body;
  
  try {
    let user_name = req.decoded.member.userName;

    await models.Post.createPost(title, description, user_name, fileId);
    for(let i = 0; i < req.files.length; i++) {
      let fileName = req.files[i].filename;
      await models.File.createFile(fileId, fileName);
    }

    const result = {
      status: 200,
      message: '게시물 작성 성공!'
    };

    res.status(200).json(result);
  } catch(error) {
    console.log(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
    
  }
}

exports.getPost = async (req, res) => {
  const { id, fileId } = req.query;
  let data, file;

  try {
    if(!id) {
      data = await models.Post.getPosts();
    }
    else {
      data = await models.Post.getPost(id);
      file = await models.File.getFiles(fileId);
    }

    const result = {
      status: 200,
      message: '게시물 불러오기 성공!',
      data,
      file
    };

    res.status(200).json(result);
  } catch(error) {
    console.log(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}

exports.deletePost = async (req, res) => {
  const { id, fileId } = req.query;

  try {
    await file.removeFiles(fileId);
    await models.Post.deletePost(id);
    await models.File.deleteFiles(fileId);

    const result = {
      status: 200,
      message: '게시물 삭제 성공!',
    };

    res.status(200).json(result);
  } catch(error) {
    console.log(error);

    const result = {
      status: 500,
      message: '서버 에러!'
    };

    res.status(500).json(result);
  }
}