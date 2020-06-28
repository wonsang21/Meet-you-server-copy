'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('chattings', [
      {
        userName: '공유',

        roomName: '공유김지원',
      },
      {
        userName: '김지원',

        roomName: '공유김지원',
      },
      {
        userName: '공유',

        roomName: '공유문채원',
      },
      {
        userName: '문채원',

        roomName: '공유문채원',
      },
      {
        userName: '지효',

        roomName: '지효공유',
      },
      {
        userName: '공유',

        roomName: '지효공유',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('chattings', null, {});
  },
};
