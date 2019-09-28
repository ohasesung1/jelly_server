module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file',{
    fileName: {
      type: DataTypes.STRING(1000),
      alloNull: false,
    },
    identifyId: {
      type: DataTypes.INTEGER(100),
      alloNull: false,
    },
    date: {
      type: DataTypes.DATE,
      alloNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    tablename: 'file',
    timestamps: false,
  });

  File.createFile = (fileId, fileName) => File.create({
    identifyId: fileId,
    fileName: fileName,
  });

  File.getFiles = (fileId) => File.findAll({
    where: {
      identifyId: fileId
    }
  });

  File.deleteFiles = (fileId) => File.destroy({
    where: {
      identifyId: fileId
    }
  });

  return File;
}