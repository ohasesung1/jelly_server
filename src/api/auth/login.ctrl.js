const model = require('../../models');
const lib = require('../../lib/token');

exports.check = async (req, res) => {
  const { id, pw } = req.body;

  if(!id) {
    const result = {
      status: 400,
      message: '아이디를 입력하세요.',
    }

    res.status(400).json(result);
  }

  if(!pw) {
    const result = {
      status: 400,
      message: '패스워드를 입력하세요.',
    }

    res.status(400).json(result);
  }

  try{
    const member = await model.Member.findMemberForLogin(id, pw);

    if(!member) {
      const result = {
        status: 401,
        message: '아이디 혹은 비밀번호가 잘못 되었습니다.',
      }
  
      res.status(401).json(result);
    }

    const token = await lib.issuedToken(member);

    const result = {
      status: 200,
      message: '로그인 성공!',
      data: {
        token,
      },
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    const result = {
      status: 500,
      message: '서버 에러!',
    }

    res.status(500).json(result);
  }
}