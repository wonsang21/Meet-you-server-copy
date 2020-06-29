"use strict";

module.exports = {
  up: (queryInterface) => {
    let message = [
      {
        _id: "04e38f68-4a31-46bc-9a9b-03485c9ccb67",
        createdAt: new Date(),
        text: "안뇽",
        user: {
          _id: "김지원",
          avatar:
            "https://www.nbnnews.co.kr/news/photo/201909/322891_370889_190.jpg",
          name: "존예보스 김지원",
        },
      },
    ];
    let json = JSON.stringify(message);
    return queryInterface.bulkInsert("chattings", [
      {
        userName: "공유",

        message: json,

        roomName: "공유김지원",
      },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("chattings", null, {});
  },
};
