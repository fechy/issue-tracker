const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Issue extends Model {}

const IssueStatus = {
  OPEN: 'OPEN',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
};

Issue.init({
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agent: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM({
      values: [
        IssueStatus.OPEN,
        IssueStatus.PENDING,
        IssueStatus.RESOLVED,
      ]
    }),
    defaultValue: IssueStatus.OPEN
  }
}, {
  sequelize,
  modelName: 'issue',
  indexes: [
    {
      fields: ['user']
    },
  ]
});

Issue.sync();

module.exports = {
  Issue,
  IssueStatus
};
