'use strict';
/* 
models 
- models 폴더는 Model을 정의한 js 파일들을 모아놓은 폴더 
*/

/* 
models/index.js
- Model을 정의하고 관계를 설정해주는 역할
- models/index.js 파일은 다음의 과정을 수행
  1. /config/config.js 파일의 설정 값을 읽어 sequelize를 생성
  2. models 폴더 아래에 존재하는 js 파일을 모두 로딩
  3. db 객체에 Model을 정의하여 반환
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[
  env
]; /*   '/../config/config.json' => '/../config/config.js'  */
const db = {};
console.log(config);
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log(config.use_env_variable);
  sequelize = new Sequelize({
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = sequelize['import'](
      path.join(__dirname, file)
    ); /* 반복문을 돌면서 import를 통해 현재 폴더 내의 모든 파일들을 불러오고 있음 */
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
