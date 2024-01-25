const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Document extends Model {}

Document.init(
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName: 'document',
  }
);

module.exports = Document;
