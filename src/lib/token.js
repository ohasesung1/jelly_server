require('dotenv').config();

const jwt = require('jsonwebtoken');
const {JWT_SECRET : secret} = process.env;

exports.issuedToken = async (id, username) => {
  const option = {
    expiresIn: '5 days',
  }

  try {
    return await jwt.sign({id, username}, secret, option);
  } catch(error) {
    console.log(error);
    
    throw error;
  }
}