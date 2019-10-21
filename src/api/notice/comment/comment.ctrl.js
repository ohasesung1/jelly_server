const models = require('../../../models');

exports.writeComment = async (req, res) => {
  const { id, comment } = req.body;
  const { member } = req.decoded;
  
  try {
    await models.Comment.writeComment(id, comment, member.id);

    const result = {
      status: 200,
      message: "댓글 작성 성공!",
    }

    res.status(500).json(result);
  } catch(error) {
    console.log(error);
    
    const result = {
      status: 500,
      message: "서버 에러!",
    }

    res.status(500).json(result);
  }
}