jest.mock('../src/models', () => {
  const path = require('path');
  const jestSequelize = require('@efi.shtain/jest-sequelize');
  const modelsPath = path.join(process.cwd(), '../src/models');
  return jestSequelize(modelsPath);
});

module.exports = async () => {};
