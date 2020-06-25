'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('idealType', [
      {
        idealTypelist: '털털', // 1
      },
      {
        idealTypelist: '착한', // 2
      },
      {
        idealTypelist: '다정', // 3
      },
      {
        idealTypelist: '순수', // 4
      },
      {
        idealTypelist: '외모 중요', // 5
      },
      {
        idealTypelist: '유머러스한', // 6
      },
      {
        idealTypelist: '열정', // 7
      },
      {
        idealTypelist: '몸매 좋은', //8
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('idealType', null, {});
  },
};
