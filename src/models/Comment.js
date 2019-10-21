module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment',{
    comment: {
      type: DataTypes.STRING(1000),
      alloNull: false,
    },
    postId: {
      type: DataTypes.INTEGER(100),
      alloNull: false,
    },
    userId: {
      type: DataTypes.STRING(500),
      alloNull: false,
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




  return Comment;
}