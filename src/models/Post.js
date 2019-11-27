module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post',{
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    gender: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    petName: {
      type: DataTypes.STRING(500),
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
    tablename: 'post',
    timestamps: false,
  });

  Post.createPost = (title, description, userName, userId ,identifyId, userPetName, gender) => Post.create({
    title: title,
    description: description,
    userName: userName,
    identifyId: identifyId,
    petName: userPetName,
    gender: gender,
    userId: userId,
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

  Post.getNewPostId = () => sequelize.query(
    `SELECT * FROM posts ORDER BY date DESC limit 1`
  );

  Post.modifyPost = (id ,title ,description) => Post.update({
    title: title,
    description: description
  },{
    where: {
      id: id,
    }
  });

  Post.getUserPost = (userId) => Post.findAll({
    where: {
      userId: userId,
    },
  });

  return Post;
}