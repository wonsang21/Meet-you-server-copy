'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('personalities', [
      {
        personalitylist: '활발',
      },
      {
        personalitylist: '털털',
      },
      {
        personalitylist: '순수',
      },
      {
        personalitylist: '다정',
      },
      {
        personalitylist: '열정',
      },
      {
        personalitylist: '친절',
      },
      {
        personalitylist: '착한',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('personalities', null, {});
  },
};
