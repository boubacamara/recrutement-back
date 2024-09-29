'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offre extends Model {
    
    static associate(models) {
      models.Offre.belongsTo(models.Utilisateur, {foreignKey: 'recruteurId', as: 'recruteur',});
      models.Offre.belongsToMany(models.Utilisateur, {
        through: models.UtilisateurOffres,
        foreignKey: 'offreId',
        as: 'candidat'
      })
      models.Offre.belongsTo(models.Categorie, {foreignKey: 'categorieId', as: 'categorie'});
      Offre.hasOne(models.Media, {foreignKey: 'parentId', as: 'media'});
    }
  }
  Offre.init({
    titre: DataTypes.STRING,
    description: DataTypes.TEXT,
    lieu: DataTypes.STRING,
    typeContrat: {
      type: DataTypes.ENUM,
      values: ['cdi', 'cdd', 'intérim', 'stage', 'alternance', 'freelance']
    },
    salaire: DataTypes.DECIMAL,
    exigences: DataTypes.TEXT,
    competences: DataTypes.TEXT,
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