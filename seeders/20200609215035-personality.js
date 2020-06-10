'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('personalities', [
      {
        personalitylist: '활발한',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personalitylist: '친절한',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personalitylist: '도도한',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personalitylist: '4차원',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('personalities', null, {});
  },
};
