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
    idealType.belongsToMany(models.users, {
      through: 'idealType_Data',
      foreignKey: 'idealTypeId',
    });
  };
  return idealType;
};
