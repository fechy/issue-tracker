jest.mock('../src/models', async () => {
  const path = require('path');
  const jestSequelize = require('@efi.shtain/jest-sequelize');
  const modelsPath = path.join(process.cwd(), '../src/models');

  const database = require('../src/database');
  await database.sync();

  return jestSequelize(modelsPath);
});

module.exports = async () => {};
