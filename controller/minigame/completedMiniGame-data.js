const { users, miniGame } = require('../../models');
const Sequelize = require('sequelize');

module.exports = {
  post: (req, res) => {
    try {
      const { userId, completedMiniGameId } = req.body;

      users
        .findOne({
          where: {
            id: userId,
          },
        })
        .then((user_Data) => {
          if (user_Data === 0) {
            res.status(404).send('Not Found User');
            return;
          } else if (!completedMiniGameId) {
            res.status(404).send('Not Found MiniGameId');
            return;
          }

          miniGame
            .findOne({
              where: {
                id: completedMiniGameId,
              },
            })
            .then((miniGame_Data) => {
              if (miniGame_Data.length === 0) {
                res.status(404).send('Not Found MiniGame_Data');
              }

              user_Data.addMiniGames(miniGame_Data);
              users.update(
                { point: Sequelize.literal('point + 1000') },
                {
                  where: {
                    id: userId,
                  },
                }
              );
              res.status(200).send('completed miniGame!');
            });
        });
    } catch (err) {
      res.status(404).send(err);
    }
  },
};
