import {Model, Association, DataTypes} from 'sequelize';
import database from '../database';
import Issue from './issue';

class Agent extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public busy?: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static findAllAvailable(): Promise<Agent[]> {
    return this.findAll({ where: { busy: false } });
  }

  static findAvailable(): Promise<Agent | null> {
    return this.findOne({ where: { busy: false } });
  }

  static freeAgent(id: number): Promise<[number, Agent[]]> {
    return this.update({ busy: false }, { where: { id } });
  }

  static setBusy(id: number): Promise<[number, Agent[]]> {
    return this.update({ busy: true }, { where: { id } });
  }

  public static associations: {
    issues: Association<Agent, Issue>;
  };
}

Agent.init({
  // attributes
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  busy: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: database,
  modelName: 'agent',
  indexes: [
    {
      unique: true,
      fields: ['username']
    },
  ]
});

// Agent.hasOne(Issue);
Agent.sync();

export default Agent;
