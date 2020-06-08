'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      age: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: DataTypes.STRING,
      username: DataTypes.STRING,
      profile_Photo: DataTypes.STRING,
      nickname: DataTypes.STRING,
      blood: DataTypes.ENUM({
        values: ['A', 'B', 'AB', 'O'],
      }),
      gender: DataTypes.ENUM({
        values: ['man', 'women'],
      }),
      drinking: DataTypes.STRING,
      smoking: DataTypes.STRING,
      job: DataTypes.STRING,
      point: DataTypes.INTEGER,
      school: DataTypes.STRING,
    },
    {}
  );
  users.associate = function (models) {
    models;
    // associations can be defined here
  };
  return users;
};
