module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post',{
   descrption: {
     type: DataTypes.STRING(1000),
     alloNull: false,
   },
   image: {
     type: DataTypes.STRING(500),
     alloNull: true,
   }
  }, {
    tablename: 'post',
    timestamps: false,
  });

  Post.findAllPost = () => Post.findOne({
      attuributes: ['description', 'image'],
  });

  Post.findPost = (id) => Post.findOne({
    attuributes: ['description', 'image'],
    where: {
      id: id
    }
  })

  return Post;
}