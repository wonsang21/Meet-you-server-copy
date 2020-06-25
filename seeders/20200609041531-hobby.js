'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('hobby', [
      {
        hobbylist: '영화 보기', // 1
      },
      {
        hobbylist: '카페 가기', // 2
      },
      {
        hobbylist: '노래방 가기', // 3
      },
      {
        hobbylist: '수다 떨기', // 4
      },
      {
        hobbylist: '맛집 찾기', // 5
      },
      {
        hobbylist: '여행 가기', // 6
      },
      {
        hobbylist: '게임 하기', // 7
      },
      {
        hobbylist: '요리 하기', //8
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hobby', null, {});
  },
};
