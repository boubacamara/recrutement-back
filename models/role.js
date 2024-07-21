'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Role.hasOne(models.Utilisateur, {
        foreignKey: 'roleId',
        as: 'utilisateur'
      })
    }
  }
  Role.init({
    intitule: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'recruteur', 'candidat'],
        defaultValue: 'candidat'
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};