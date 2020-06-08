'use strict';
module.exports = (sequelize, DataTypes) => {
  const idealType = sequelize.define(
    'idealType',
    {
      idealTypelist: DataTypes.STRING,
    },
    {}
  );
  idealType.associate = function (models) {
    models;
    // associations can be defined here
  };
  return idealType;
};
