'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('hobbies', [
      {
        hobbylist: '운동',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hobbylist: '책읽기',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hobbylist: '산책',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        hobbylist: '여행',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hobbies', null, {});
  },
};
