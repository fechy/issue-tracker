const Sequelize = require('sequelize');
const { db } = require('../config');

const sequalize = new Sequelize(db.database, db.username, db.password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequalize;
