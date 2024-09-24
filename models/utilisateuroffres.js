'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UtilisateurOffres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UtilisateurOffres.init({
    utilisateurId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    offreId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    statut: {
      type: DataTypes.ENUM('attente', 'accepter', 'refuser'),
      defaultValue: 'attente',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UtilisateurOffres',
  });
  return UtilisateurOffres;
};