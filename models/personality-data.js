'use strict';
module.exports = (sequelize, DataTypes) => {
  const personality_Data = sequelize.define(
    'personality_Data',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      personalityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },

    { timestamps: false }
  );
  personality_Data.associate = function () {};
  return personality_Data;
};
