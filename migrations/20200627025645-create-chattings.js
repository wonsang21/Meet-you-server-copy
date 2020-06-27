'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chattings', {
      userName: {
        type: Sequelize.STRING,
      },
      message: {
        type: Sequelize.STRING,
        defaultValue: '[]',
      },
      roomName: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('chattings');
  },
};
