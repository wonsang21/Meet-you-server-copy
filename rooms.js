const { chattings } = require('./models');

module.exports = {
  rooms: () => {
    return new Promise((resolve, reject) => {
      chattings
        .findAll({
          attributes: ['roomName'],
          raw: true,
        })
        .then((roomNames) => {
          const rooms = roomNames.map((room) => {
            return room.roomName;
          });
          const chattingRooms = Array.from(new Set(rooms));
          resolve(chattingRooms);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
