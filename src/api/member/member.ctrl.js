const models = require('../../models');

exports.getmemberData = async (req, res) => {
  const { member } = req.decoded;
  console.log("memberData Call");
  
  try {
    // await models
    const userData = member;
    const userPostData = await models.Post.getUserPost(member.id);

    const result = {
      status: 200,
      message: "유저 데이터 조회 성공",
      data: {
        userData,
        userPostData,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    const result = {  
      status: 500,
      message: "서버 에러",
    };

    res.status(500).json(result);
  }
}