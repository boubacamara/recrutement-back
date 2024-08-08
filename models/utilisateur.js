'use strict';
const { Model } = require('sequelize');
const sel = require('../core/shared/sel');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {

    static async connexion(email, motDePasse) {

      let utilisateur = await this.findOne({
        where: {email}
      });

      if(!utilisateur) throw Error(`Email ou mot de passe incorrect`);

      if(!await bcrypt.compare(motDePasse, utilisateur.motDePasse)) {
        throw Error(`Email ou mot de passe incorrect`)
      }

      return utilisateur;
    }

    static async modifierEmail(email, monJeton) {

      let utilisateur = await this.findOne({where: {monJeton}});

      if(!utilisateur) throw Error(`Le token utilisé n'existe pas ou plus`);

      let nMonJeton = sel.generer();

      utilisateur = await utilisateur.update({
        email,
        monJeton: nMonJeton
      });

      if(!utilisateur) throw Error(`L'adresse mail n'a pas puis être modifié`);

      return email;
    }
    
    static associate(models) {
      models.Utilisateur.belongsTo(models.Role, {
        foreignKey: {
          name: 'roleId',
          allowNull: false
        },
        as: 'role'
      });

      models.Utilisateur.hasOne(models.Profile, {
        foreignKey: {
          name: 'utilisateurId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'profile'
      });

      models.Utilisateur.hasMany(models.Offre, {
        foreignKey: {
          name: 'recruteurId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'offre'
      });

      models.Utilisateur.hasOne(models.Entreprise, {
        foreignKey: {
          name: 'recruteurId',
          allowNull: false
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'entreprise'
      });
    }
  }

  Utilisateur.init({
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'roleId'
      }
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    motDePasse: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    monJeton: {
      type: DataTypes.STRING(35),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Utilisateur',
  });
  return Utilisateur;
};