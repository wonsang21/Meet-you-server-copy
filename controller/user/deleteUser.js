const {
  users,
  hobby_Data,
  personality_Data,
  idealType_Data,
} = require('../../models');

module.exports = {
  get: (req, res) => {
    const { userId } = req.query;
    const HPI_Data = [hobby_Data, personality_Data, idealType_Data];

    users.destroy({
      where: {
        id: userId,
      },
    });
    HPI_Data.forEach((model_Data) => {
      model_Data.destroy({
        where: {
          userId: userId, // 1
        },
      });
    });
    res.status(200).send(`id ${userId}번 회원님의 정보의 모든 삭제하였습니다.`);
  },
};
