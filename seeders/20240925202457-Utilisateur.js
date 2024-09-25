'use strict';

const salt = require('../core/shared/sel');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let saltGen = await bcrypt.genSalt(12);
    const motDePasse = await bcrypt.hash('Dado1', saltGen);

    const admin = {
      motDePasse,
      email: 'admin@dado.sn',
      monJeton: salt.generer(25),
      roleId: 1,
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }

    const recruteur = {
      motDePasse,
      email: 'recruteur@dado.sn',
      monJeton: salt.generer(25),
      roleId: 2,
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }

    const candidat = {
      motDePasse,
      email: 'recruteur@dado.sn',
      monJeton: salt.generer(25),
      roleId: 3,
      createdAt: '2024-03-23 00:23',
      updatedAt: '2024-03-23 00:23',
    }

    queryInterface.bulkInsert('Utilisateurs', [
      admin,
      recruteur,
      candidat
    ])
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Utilisateurs', null, {});
     
  }
};
