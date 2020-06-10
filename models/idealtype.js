'use strict';
module.exports = (sequelize, DataTypes) => {
  const idealType = sequelize.define(
    'idealType',
    {
      idealTypelist: DataTypes.STRING,
    },
    { timestamps: false }
  );
  idealType.associate = function (models) {
    idealType.belongsToMany(models.users, {
      through: 'idealType_Data',
      foreignKey: 'idealTypeId',
    });
  };
  return idealType;
};
