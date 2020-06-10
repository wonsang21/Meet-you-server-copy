'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('idealTypes', [
      {
        idealTypelist: '외모',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idealTypelist: '몸매',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idealTypelist: '돈',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idealTypelist: '성격',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idealTypelist: '직업',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('idealTypes', null, {});
  },
};
