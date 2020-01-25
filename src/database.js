const Sequelize = require('sequelize');
const { db: { database, username, password, port} } = require('../config');

const sequelize = new Sequelize(`postgres://${username}:${password}@localhost:${port}/${database}`, {
  logging:
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? null : console.log,
});

module.exports = sequelize;
