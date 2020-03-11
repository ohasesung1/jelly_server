require('dotenv').config();

const jwt = require('jsonwebtoken');
const {JWT_SECRET : secret} = process.env;

exports.issuedToken = async (member) => {
  const option = {
    expiresIn: '5 days',
    subject: 'token'
  }

  try {
    return await jwt.sign({ member }, secret, option);
  } catch(error) {
    console.log(error);
    throw error;
  }
}

exports.refreshToken = async (member) => {
  const option = {
    expiresIn: '7 days',
  }

  try {
    return await jwt.sign({ member }, secret, option);
  } catch(error) {
    console.log(error);
    throw error;
  }
}

exports.verify = async (token) => {
  try{
    return jwt.verify(token, secret);
  } catch(error) {
    throw error;
  }
}