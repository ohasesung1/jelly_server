const fs = require('fs');
const models = require('../models');

exports.removeFiles = async (fileId) => {
  const fileData = await models.File.getFiles(fileId);
  
  for(let i = 0; i < fileData.length; i++) {
    const filename = fileData[i].dataValues.fileName;
    if(filename === null) {
      return;
    }
  
    fs.unlinkSync(`./public/${filename}`);
  }
}

exports.deleteDbFile = async (fileId) => {
  const fileData = await models.File.getFile(fileId);
  console.log(fileData);
  
  const filename = fileData.dataValues.fileName;

  fs.unlinkSync(`./public/${filename}`);
}