module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('like',{
    like: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER(100),
      allowNull: false
    },
  }, {
    tablename: 'like',
    timestamps: false,
  });

  Like.createLike = (identifyId) => Like.create({
    postId: identifyId
  });

  Like.updateLike = (identifyId, like) => Like.update({
    like: like
  },{
    where: {
      postId: identifyId,
    }
  });

  Like.getLike = (identifyId) => Like.findOne({
    where: {
      postId: identifyId,
    }
  });

  // Like.cancleLike = (identifyId) => Like
  return Like;
}
