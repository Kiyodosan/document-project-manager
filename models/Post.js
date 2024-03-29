const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_created: {
    	type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    file_url: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
/* 		like_count: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		}, */
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false, 
    freezeTableName: true,
    underscored: true, 
    modelName: 'post', 
  }
);

module.exports = Post;