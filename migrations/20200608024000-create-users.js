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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
          values: ['남자', '여자'],
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
        defaultValue: 0,
      },
      school: {
        type: Sequelize.STRING,
      },
      signUpCreateTime: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
