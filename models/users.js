'use strict';
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      age: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: DataTypes.STRING,
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
    {
      timestamps: false,
      hooks: {
        afterValidate: (data) => {
          var shasum = crypto.createHash('sha1');
          let salt = 'random string';
          shasum.update(data.password + salt);
          data.password = shasum.digest('hex');
        },
      },
    }
  );
  users.associate = function (models) {
    models;
    // associations can be defined here
  };
  return users;
};
