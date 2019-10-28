const models = require('../../models');
const file = require('../../lib/file');

async function createIdentifyId() {
  let postData = await models.Post.getNewPostId();
  let identifyId;

  if(postData[0][0] == null || postData[0][0] == undefined) {
    identifyId = 0;
 } else {
    identifyId = postData[0][0].id;
 }

 return identifyId;
}


exports.createNotice = async (req, res) => {
  const { title, description } = req.body;
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

  try {
    console.log(member.id);
    

    if(!req.files[0]) {
      const identifyId = await createIdentifyId();

      await models.Post.createPost(title, description, member.userName, member.id,identifyId, member.userPetName, member.gender);
      // await models.Like.createLike(identifyId);
      const result = {
        status: 200,
        message: '게시물 작성 성공!'
      };
  
      res.status(200).json(result);

      return;
    }

    const identifyId = await createIdentifyId();
    
    
    for(let i = 0; i < req.files.length; i ++) {
      await models.File.createFile(identifyId, req.files[i].filename);
    }
    console.log(title, description, member.name,member.userId );
    
    await models.Post.createPost(title, description, member.userName, member.id, identifyId, member.userPetName, member.gender);

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
  // const { id } = req.query;
  // let post;

  try {
    // if(!id) {
    //   post = await models.Post.getPosts();
    // }
    // else {
    //   post = await models.Post.getPost(id);
    //   console.log(post);
      
    //   file = await models.File.getFiles();
    // }
    const post = await models.Post.getPosts();
    const file = await models.File.getFiles();

    const result = {
      status: 200,
      message: '게시물 불러오기 성공!',
      data: {
        post,
        file
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
  const { id } = req.query;

  try {

    const postData = await models.Post.getPost(id);
    
    const identifyId = postData.dataValues.identifyId;

    await file.removeFiles(identifyId);
    await models.Post.deletePost(id);
    await models.File.deleteFiles(identifyId);

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

exports.modifyPost = async (req, res) => {
  const { id, title, description, identifyId, fileId } = req.body;

  try {
    if(!req.files[0] && !fileId) {
      await models.Post.modifyPost(id, title, description);

      const result = {
        status: 200,
        message: "게시글 수정 성공!",
      }
  
      res.status(200).json(result);

      return;
    }
    else if(identifyId) {

      for(let i = 0; i < req.files.length; i++) {
        await models.File.createFile(identifyId, req.files[i].filename);
      }

      const result = {
        status: 200,
        message: "게시글 수정 성공! (파일 추가)",
      }
  
      res.status(200).json(result);

      return;
    }
    else if(fileId) {                
      await file.deleteDbFile(fileId);
      await models.File.deleteFile(fileId);
      

      const result = {
        status: 200,
        message: "게시글 수정 성공! (파일 삭제)",
      }
  
      res.status(200).json(result);
    }

  } catch(error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}