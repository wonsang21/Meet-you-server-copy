'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('miniGame', [
      {
        problem: '어부들이 제일 싫어하는 연예인은?',
        solution: '배철수',
      },
      {
        problem: '김나영이 화났을때 한 문장으로 표현하면?',
        solution: '머리에 김나영',
      },
      {
        problem: '네마리의 고양이가 괴물이 되면?',
        solution: '포켓몬스터',
      },
      { problem: '중학생과 고등학생이 타는 차는?', solution: '중고차' },
      {
        problem: '세상에서 가장 큰 컵은?',
        solution: '월드컵',
      },
      {
        problem: '성(Castle) 세곳이 불타면?',
        solution: '삼성화재',
      },
      {
        problem: '김밥이 죽으면 가는 곳은?',
        solution: '김밥천국',
      },
      { problem: '창문이 100개 였는데 2개가 깨지면?', solution: 'window 98' },
      {
        problem: '자동차를 톡 치면?',
        solution: '카톡',
      },
      {
        problem: '애플사에서 만든 술은?',
        solution: '맥(Mac)주',
      },
      {
        problem: '가장 야한 옷을 입는 연예인은?',
        solution: '다비치',
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('miniGame', null, {});
  },
};
