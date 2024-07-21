'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      dateDeNaissance: {
        type: Sequelize.DATE,
        allowNull: false
      },
      telephone: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      ville: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles');
  }
};