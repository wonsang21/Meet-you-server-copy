'use strict';
module.exports = (sequelize, DataTypes) => {
  const miniGame = sequelize.define(
    'miniGame',
    {
      problem: DataTypes.STRING,
      solution: DataTypes.STRING,
    },
    {}
  );
  miniGame.associate = function (models) {
    models;
    // associations can be defined here
  };
  return miniGame;
};
