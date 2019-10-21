module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post',{
    title: {
      type: DataTypes.STRING(500),
      alloNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      alloNull: false,
    },
    userName: {
      type: DataTypes.STRING(500),
      alloNull: false,
    },
    gender: {
      type: DataTypes.INTEGER(10),
      alloNull: false,
    },
    userId: {
      type: DataTypes.STRING(500),
      alloNull: false,
    },
    petName: {
      type: DataTypes.STRING(500),
      alloNull: false,
    },
   fileId: {
     type: DataTypes.INTEGER(100),
     alloNull: false,
   },
   date: {
    type: DataTypes.DATE,
    alloNull: false,
    defaultValue: DataTypes.NOW
   },
  }, {
    tablename: 'post',
    timestamps: false,
  });

  Post.createPost = (title, description, userName, fileId, userPetName, gender) => Post.create({
    title: title,
    description: description,
    userName: userName,
    fileId: fileId,
    petName: userPetName,
    gender: gender,
    
  });

  Post.getPosts = () => Post.findAll({
    attuributes: ['title', 'description', 'userName', 'date'],
  });

  Post.getPost = (id) => Post.findOne({
    attuributes: ['title', 'description', 'userName', 'date'],
    where: {
      id: id
    }
  });

  Post.deletePost = (id) => Post.destroy({
    where: {
      id: id
    }
  });

  return Post;
}