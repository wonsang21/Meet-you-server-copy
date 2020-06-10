'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('idealTypes', [
      {
        idealTypelist: '외모',
      },
      {
        idealTypelist: '몸매',
      },
      {
        idealTypelist: '돈',
      },
      {
        idealTypelist: '성격',
      },
      {
        idealTypelist: '직업',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('idealTypes', null, {});
  },
};
