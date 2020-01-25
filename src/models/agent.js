const Sequelize = require('sequelize');
const sequelize = require('../database');

const Model = Sequelize.Model;
class Agent extends Model {}

Agent.init({
  // attributes
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  busy: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'agent',
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
  ]
});

Agent.sync();

module.exports = Agent;
