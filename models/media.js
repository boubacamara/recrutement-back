'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Media.belongsTo(models.Utilisateur, {foreignKey: 'parentId', as: 'utilisateur'});
      Media.belongsTo(models.Entreprise, {foreignKey: 'parentId', as: 'entreprise'});
    }
  }
  Media.init({
    lien: {
      type: DataTypes.STRING,
      allowNull: false
    },
    extension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};