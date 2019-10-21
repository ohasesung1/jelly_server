const models = require('../../models');
const file = require('../../lib/file');

exports.createNotice = async (req, res) => {
  const {title, description, fileId } = req.body;
  const { member } = req.decoded; 
  
  if(!title) {
    const result = {
      status: 400,
      message: '제목을 입력해 주세요!'
    };

    res.status(400).json(result);
  }

  if(!description) {
    const result = {
      status: 400,
      message: '내용을 입력해 주세요!'                   
    };

    res.status(400).json(result);
  }

  if(!fileId) {
    const result = {
      status: 400,
      message: '파일 id를 입력해 주세요!'
    };

    res.status(400).json(result);
  }

  try {

    await models.Post.createPost(title, description, member.userName, fileId, member.userPetName, member.gender);

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
  let post, file;

  try {
    if(!id) {
      data = await models.Post.getPosts();
    }
    else {
      post = await models.Post.getPost(id);
      file = await models.File.getFiles(fileId);
    }

    const result = {
      status: 200,
      message: '게시물 불러오기 성공!',
      data: {
        post
      }
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
  const { id, fileId, 
    inherentFileId } = req.query;

  try {
    if(!id && !fileId) {
      await models.File.deleteFile(inherentFileId);

      const result = {
        status: 200,
        message: '파일 삭제 성공!',
      };
  
      res.status(200).json(result);

      return;
    }


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