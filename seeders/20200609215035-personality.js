'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('personality', [
      {
        personalitylist: '활발', // 1
      },
      {
        personalitylist: '털털', // 2
      },
      {
        personalitylist: '순수', // 3
      },
      {
        personalitylist: '다정', // 4
      },
      {
        personalitylist: '열정', // 5
      },
      {
        personalitylist: '친절', // 6
      },
      {
        personalitylist: '착한', // 7
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('personality', null, {});
  },
};
