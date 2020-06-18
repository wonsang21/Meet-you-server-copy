'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('hobbies', [
      {
        hobbylist: '영화 보기',
      },
      {
        hobbylist: '카페 가기',
      },
      {
        hobbylist: '노래방 가기',
      },
      {
        hobbylist: '수다 떨기',
      },
      {
        hobbylist: '맛집 찾기',
      },
      {
        hobbylist: '여행 가기',
      },
      {
        hobbylist: '게임 하기',
      },
      {
        hobbylist: '요리 하기',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('hobbies', null, {});
  },
};
