'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('idealTypes', [
      {
        idealTypelist: '털털',
      },
      {
        idealTypelist: '착한',
      },
      {
        idealTypelist: '다정',
      },
      {
        idealTypelist: '순수',
      },
      {
        idealTypelist: '외모 중요',
      },
      {
        idealTypelist: '유머러스한',
      },
      {
        idealTypelist: '열정',
      },
      {
        idealTypelist: '몸매 좋은',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('idealTypes', null, {});
  },
};
