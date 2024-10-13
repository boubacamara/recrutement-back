'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const admin = {
      intitule: 'admin',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }
    const recruteur = {
      intitule: 'recruteur',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }
    const candidat = {
      intitule: 'candidat',
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }

    await queryInterface.bulkInsert('Roles', [
      admin,
      recruteur,
      candidat
    ])
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Roles', null, {});
     
  }
};
