'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entreprise extends Model {

    static async modifierEntreprise(data, recruteurId, entrepriseId) {

    let { nom, ninea, adresse, telephone } = data;


      let entreprise = await this.findOne({where: {id: entrepriseId}})

      if(!entreprise) throw Error('Aucun entreprise trouvé avec cet identifiant');
    
      if(entreprise?.recruteurId !== recruteurId) throw Error('Accès non autorisé');

      entreprise = entreprise.update({
        nom, ninea, adresse, telephone
      });

      if(!entreprise) throw Error(`Les modifications n'ont pas puis être effectué`);

      return entreprise;
    }

    static associate(models) {
      models.Entreprise.belongsTo(models.Utilisateur, {
        foreignKey: 'recruteurId',
        as: 'recruteur'
      })
    }
  }

  Entreprise.init({
    nom: DataTypes.STRING,
    ninea: DataTypes.STRING,
    adresse: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    recruteurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entreprise',
  });
  return Entreprise;
};