'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offre extends Model {
    
    static associate(models) {
      models.Offre.belongsTo(models.Utilisateur, {foreignKey: 'recruteurId', as: 'utilisateur',});
      models.Offre.belongsTo(models.Categorie, {foreignKey: 'categorieId', as: 'categorie'});
    }
  }
  Offre.init({
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    entreprise: DataTypes.STRING,
    lieu: DataTypes.STRING,
    typeContrat: {
      type: DataTypes.ENUM,
      values: ['cdi', 'cdd', 'intérim', 'stage', 'alternance', 'freelance']
    },
    salaire: DataTypes.DECIMAL,
    exigences: DataTypes.TEXT,
    competences: DataTypes.TEXT,
    experienceRequise: DataTypes.STRING,
    educationRequise: DataTypes.STRING,
    categorieId: DataTypes.INTEGER,
    recruteurId: DataTypes.INTEGER,
    publier: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Offre',
  });
  return Offre;
};