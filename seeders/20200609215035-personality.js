'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('personalities', [
      {
        personalitylist: '활발한',
      },
      {
        personalitylist: '친절한',
      },
      {
        personalitylist: '도도한',
      },
      {
        personalitylist: '4차원',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('personalities', null, {});
  },
};
