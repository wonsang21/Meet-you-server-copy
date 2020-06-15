require('dotenv').config();

module.exports = {
  development: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_USERNAME,
    host: process.env.RDS_USERNAME,
    database: 'meetyouDB',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    database: 'Meet-you',
    dialect: 'mysql',
    port: 13306,
    operatorsAliases: false,
  },
};
