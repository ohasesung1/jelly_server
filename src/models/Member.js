module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('member',{
    id: {
      field: 'id',
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      unipue: true,
    },
    pw: {
      field: 'pw',
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    userName: {
      field: 'user_name',
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    userPetName: {
      field: 'user_pet_name',
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    gender: {
      field: 'gender',
      type: DataTypes.INTEGER(2),
      allowNull: true
    } 
  }, {
    tablename: 'member',
    timestamps: false,
  });

    Member.findMemberForLogin = (id, pw) => Member.findOne({
      attuributes: ['id', 'pw', 'user_name', 'user_pet_name', 'gender'],
      where: {
        id: id,
        pw: pw,
      },
        raw: true,
    });
    
    Member.signUpMember = (id, pw, user_name, user_pet_name, gender) => Member.create({
      id: id,
      pw: pw,
      userName: user_name,
      userPetName: user_pet_name,
      gender: gender
    });

  return Member;
}