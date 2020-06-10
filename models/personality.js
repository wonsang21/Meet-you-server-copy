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
    personality.belongsToMany(models.users, {
      through: 'personality_Data',
      foreignKey: 'personalityId',
    });
  };
  return personality;
};
``;
