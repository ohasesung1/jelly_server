const lib = require('../lib/token');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(token);
  
  try {
    let decodedToken = await lib.verify(token);
    
    if(decodedToken.sub !== 'token') {
      const result = {
        status: 403,
        message: '잘못된 토큰'
      };

      res.status(403).json(result);

      return;
    }
    
    req.decoded = decodedToken;
    
  } catch(error) {
    console.log(error.message);

    switch(error.message) {
      case 'jwt must be provided':
        status = 401;
        message = '토큰을 전송해 주세요.'
        break;
      case 'invalid signature':
      case 'jwt malformed':
      case 'invalid token':
        status = 401;
        message = '위조된 토큰 입니다.'
        break;
      case 'jwt expired':
        status = 410;
        message = '토큰이 만료되었습니다';
        break;
      default:
        status = 500;
        message = '서버 에러!';
    }
    
    const result = {
      status: status,
      message: message
    };

    res.status(status).json(result);

    return;
  }
  
  await next();
}

module.exports = verifyToken;