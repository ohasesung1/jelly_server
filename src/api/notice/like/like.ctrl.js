const models = require('../../../models');

exports.addLike = async (req, res) => {
  const { like, identifyId } = req.body;
  const { member } = req.decoded;

  try {
    await models.Like.updateLike()


  
    const result = {
      status: 200,
      message: "좋아요 추가 성공"
   }

   res.status(200).JSON(result);
  } catch (error) {
    console.log(error);

    const result = {
       status: 500,
       message: "서버 에러"
    }

    res.status(500).JSON(result);
  }
}