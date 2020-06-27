'use strict';
module.exports = (sequelize, DataTypes) => {
  const chattings = sequelize.define(
    'chattings',
    {
      userName: DataTypes.STRING,
      message: {
        type: DataTypes.STRING,
      },
      roomName: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  chattings.associate = function () {
    // associations can be defined here
  };
  return chattings;
};
