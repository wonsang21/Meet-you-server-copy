const { miniGame, miniGame_Data } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  get: (req, res) => {
    try {
      const { userId } = req.query;

      miniGame_Data
        .findAll({
          where: {
            userId: userId,
          },
          attributes: ['miniGameId'],
          raw: true,
        })
        .then((array_miniGameIds) => {
          const miniGameIds = array_miniGameIds.map((obj) => {
            return obj.miniGameId;
          }); // [1,2,4]
          miniGame
            .findAll({
              where: {
                id: {
                  [Sequelize.Op.not]: miniGameIds, // [1,2,4]
                },
              },
              raw: true,
              order: Sequelize.literal('rand()'),
              limit: 1,
            })
            .then((miniGames) => {
              res.status(200).send(miniGames[0]);
            });
        });
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
