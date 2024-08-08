'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    
    static async creationProfile(data, utilisateurId)
    {
      let { nom, prenom, dateDeNaissance, telephone, ville } = data;

      let utilisateurExiste = await this.findOne({where: {
        utilisateurId
      }});

      if(utilisateurExiste) throw Error(`${utilisateurExiste.prenom} votre profile existe déja`);

      let utilisateur = this.create({
        nom, prenom, dateDeNaissance,
        telephone, utilisateurId, ville
      });

      if(!utilisateur) throw Error(`Le profile n'a pas puis être crée`);

      return utilisateur;
    }

    static async modifierProfile(data, utilisateurId) {

      let { nom, prenom, dateDeNaissance, telephone, ville, pseudo } = data;

      let profile = await this.findOne({
        where: { utilisateurId},
        include: 'utilisateur'
      });

      if(!profile) throw Error('Profil non trouvé');

      profile = await profile.update({
        nom, prenom, dateDeNaissance, telephone, ville
      });

      if(!profile) throw Error(`Votre profile n'a pas puis être modifié`);
    }
    
    static associate(models) {
      models.Profile.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur'
      })
    }
  }

  Profile.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    dateDeNaissance: DataTypes.DATE,
    telephone: DataTypes.INTEGER,
    ville: DataTypes.STRING,
    utilisateurId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};