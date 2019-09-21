const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {
  
  const token = req.header['x-access-token'];

  if(!token) {
    const result = {
      status: 400,
      message: '토큰이 없습니다.'
    }

    res.status(400).json(result);
  }
  try {
    const decodedToken = jwt.verify(token);
    console.log(decodedToken);
    
  } catch(error) {
    console.log(error);
    const result = {
      status: 500,
      message: '서버 에러!'
    }

    res.status(400).json(result);
  }

  return verification;
}