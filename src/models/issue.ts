import { Model, DataTypes } from 'sequelize';
import Agent from './agent';
import sequelize from '../database';

export const IssueStatus = {
  OPEN: 'OPEN',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
};

class Issue extends Model {
  public id!: number;
  public user!: string;
  public description!: string;
  public agentId!: number;
  public status!: string | 'OPEN';

  static findOpen(): Promise<Issue | null> {
    return this.findOne({
      where: {
        status: IssueStatus.OPEN
      }
    });
  }

  static assignAgent(issueId: number, agentId: number): Promise<[number, Issue[]]> {
    return this.update({
      agentId,
      status: IssueStatus.PENDING
    }, {
      where: {
        id: issueId
      }
    });
  }
}

Issue.init({
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  agentId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
    references: {
      model: Agent,
      key: 'id'
    },
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

export default Issue;
