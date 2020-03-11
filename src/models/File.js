module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file',{
    fileName: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    identifyId: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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

  File.getFiles = () => File.findAll({
    attuributes: ['id', 'fileName', 'identifyId', 'date'],
    // where: {
    //   identifyId: fileId
    // }
  });

  File.deleteFiles = (fileId) => File.destroy({
    where: {
      identifyId: fileId
    }
  });

  File.deleteFile = (fileId) => File.destroy({
    where: {
      id: fileId
    }
  });

  File.getFile = (fileId) => File.findOne({
    where: {
      id: fileId,
    },
  });

  

  return File;
}