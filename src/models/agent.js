const Sequelize = require('sequelize');
const sequelize = require('../database');
const { Issue } = require('./issue');

const Model = Sequelize.Model;
class Agent extends Model {
  static findAvailable() {
    return this.findOne({ where: { busy: false } });
  }

  static freeAgent(id) {
    return this.update({ busy: false }, { where: { id } });
  }

  static setBusy(id) {
    return this.update({ busy: true }, { where: { id } });
  }
}

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

Agent.hasOne(Issue);

Agent.sync();

module.exports = Agent;
