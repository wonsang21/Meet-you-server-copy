'use strict';
module.exports = (sequelize, DataTypes) => {
  const miniGame_Data = sequelize.define(
    'miniGame_Data',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      miniGameId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  miniGame_Data.associate = function () {};
  return miniGame_Data;
};
