require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOSTNAME,
    database: 'meetyouDB',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  // production: {
  //   username: process.env.RDS_USERNAME,
  //   password: process.env.RDS_PASSWORD,
  //   host: process.env.RDS_HOSTNAME,
  //   database: 'lostjk',
  //   dialect: 'mysql',
  //   port: 13306,
  //   operatorsAliases: false,
  // },
};
