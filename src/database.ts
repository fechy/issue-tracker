import { Sequelize } from 'sequelize';
import { db } from '../config';

const sequelize = new Sequelize(`postgres://${db.username}:${db.password}@localhost:${db.port}/${db.database}`);

export default sequelize;
