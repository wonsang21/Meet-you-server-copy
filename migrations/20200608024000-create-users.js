'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      age: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      profile_Photo: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      blood: {
        type: Sequelize.ENUM({ values: ['A', 'B', 'AB', 'O'] }),
      },
      gender: {
        type: Sequelize.ENUM({
          values: ['man', 'women'],
        }),
      },
      drinking: {
        type: Sequelize.STRING,
      },
      smoking: {
        type: Sequelize.STRING,
      },
      job: {
        type: Sequelize.STRING,
      },
      point: {
        type: Sequelize.INTEGER,
      },
      school: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    Sequelize;
    return queryInterface.dropTable('users');
  },
};
