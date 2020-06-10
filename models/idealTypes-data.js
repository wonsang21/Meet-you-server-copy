'use strict';
module.exports = (sequelize, DataTypes) => {
  const idealType_Data = sequelize.define(
    'idealType_Data',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idealTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },

    { timestamps: false }
  );
  idealType_Data.associate = function () {};
  return idealType_Data;
};
