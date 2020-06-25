const { users } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    const { userId, minosPoint } = req.body;
    try {
      users
        .findOne({
          where: {
            id: userId,
          },
        })
        .then((user) => {
          let user_Point = user.get({ plain: true }).point;
          if (user_Point === 0) {
            res.status(200).send('유저의 포인트가 없습니다.');
            return;
          }
          users.update(
            {
              point: Sequelize.literal(`point - ${minosPoint}`),
            },
            {
              where: {
                id: userId,
              },
            }
          );
          res.status(200).send('유저의 포인트를 삭감하였습니다.');
        });
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
