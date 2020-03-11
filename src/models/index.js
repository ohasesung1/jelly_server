const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config/database.js');

const sequelize = new Sequelize(config.database, config.username, 
  config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  });

const models = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('0') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);

    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });


  Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  sequelize.sync().then(() => {
    console.log('[Model - Index] Schema is synchronized');
  }).catch((error) => {
    console.log('[Model - Index] An error has occurred: ', (error));
  }); 


models.sequelize = sequelize;
models.Sequelize = sequelize;

module.exports = models;
