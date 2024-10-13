'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const dev = {
      intitule: 'développeur web',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }
    const commerce = {
      intitule: 'commerce',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }
    const tourisme = {
      intitule: 'tourisme',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }

    await queryInterface.bulkInsert('Categories', [
      dev,
      commerce,
      tourisme
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
