const models = require('../../../models');

exports.writeComment = async (req, res) => {
  const { noticeId, comment } = req.body;
  const { member } = req.decoded;
  
  try {
    await models.Comment.writeComment(noticeId, comment, member.id);

    const result = {
      status: 200,
      message: "댓글 작성 성공!",
    }

    res.status(200).json(result);
  } catch(error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}

exports.getComment = async (req, res) => {
  const { noticeId } = req.query;

  try {

    const comment = await models.Comment.getComment(noticeId);

    const result = {
      status: 200,
      message: "댓글 불러오기 성공!",
      data: {
        comment
      }
    }

    res.status(200).json(result);
  } catch(error) {
    console.log(error);

        
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
    
  }
}

exports.deleteComment = async (req, res) => {
  const { commentId } = req.query;

  try {

    await models.Comment.deleteComment(commentId);

    const result = {
      status: 200,
      message: "댓글 삭제 성공!",
    }

    res.status(200).json(result);
  } catch(error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
    
  }
}

exports.updateComment = async (req, res) => {
  const {commentId, comment} = req.body;

  try {
    await models.Comment.updateComment(commentId, comment);

    const result = {
      status: 200,
      message: "댓글 수정 성공!",
    }

    res.status(200).json(result);
  } catch(error) {

    console.log(error);
    
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}