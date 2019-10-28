module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment',{
    comment: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
   date: {
    type: DataTypes.DATE,
    alloNull: false,
    defaultValue: DataTypes.NOW
   },
  }, {
    tablename: 'comment',
    timestamps: false,
  });

  Comment.writeComment = (noticeId, comment, userId) => Comment.create({
    comment: comment,
    postId: noticeId,
    userId: userId,
  });

  Comment.getComment = (postId) => Comment.findAll({
    attuributes: ['id', 'comment', 'userId', 'date'],
    where: {
      postId: postId,
    }
  });

  Comment.deleteComment = (commentId) => Comment.destroy({
    where: {
      id: commentId,
    },
  });

  Comment.updateComment = (commentId, comment) => Comment.update({
    comment: comment,
  },{
    where: {
      id: commentId,
    },
  });




  return Comment;
}