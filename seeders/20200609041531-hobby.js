'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('hobbies', [
      {
        hobbylist: '운동', // 1
      },
      {
        hobbylist: '책읽기', // 2
      },
      {
        hobbylist: '산책', // 3
      },
      {
        hobbylist: '여행', // 4
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hobbies', null, {});
  },
};
