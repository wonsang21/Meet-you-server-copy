'use strict';
module.exports = (sequelize, DataTypes) => {
  const hobby_Data = sequelize.define(
    'hobby_Data',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      hobbyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },

    { timestamps: false }
  );
  hobby_Data.associate = function () {};
  return hobby_Data;
};
