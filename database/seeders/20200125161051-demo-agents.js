'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('agents', [
      {
        username: 'jon.snow',
        email: 'jon.snow@example.com',
        busy: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'daenerys.targarien',
        email: 'daenerys.targarien@example.com',
        busy: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'arya.stark',
        email: 'arya.stark@example.com',
        busy: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('agents', {}, {});
  }
};
