'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Utilisateurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        },
        defaultValue: 3      },
      pseudo: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      motDePasse: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      monJeton: {
        type: Sequelize.STRING(35),
        allowNull: false
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
    await queryInterface.dropTable('Utilisateurs');
  }
};