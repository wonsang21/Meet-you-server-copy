require('dotenv').config();
const env = process.env;

module.exports = {
  development: {
    username: env.RDS_USERNAME,
    password: env.RDS_PASSWOR,
    host: env.RDS_HOSTNAME,
    database: 'meetyouDB',
    dialect: 'mysql',
    port: 5000,
    operatorsAliases: false,
  },
  production: {
    username: env.RDS_USERNAME,
    password: env.RDS_PASSWORD,
    host: env.RDS_HOSTNAME,
    database: 'meetyoudb',
    dialect: 'mysql',
    port: 13306,
    operatorsAliases: false,
  },
};
