'use strict';
module.exports = (sequelize, DataTypes) => {
  const personality = sequelize.define(
    'personality',
    {
      personalitylist: DataTypes.STRING,
    },
    {}
  );
  personality.associate = function (models) {
    models;
    // associations can be defined here
  };
  return personality;
};
