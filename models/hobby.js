'use strict';
module.exports = (sequelize, DataTypes) => {
  const hobby = sequelize.define(
    'hobby',
    {
      hobbylist: DataTypes.STRING,
    },
    {}
  );
  hobby.associate = function (models) {
    hobby.belongsToMany(models.users, {
      through: 'hobby_Data',
    });
  };
  return hobby;
};
