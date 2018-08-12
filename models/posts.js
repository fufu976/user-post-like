'use strict';
module.exports = (sequelize, DataTypes) => {
  var Posts = sequelize.define('Posts', {
    subject: DataTypes.STRING,
    article: DataTypes.STRING
  }, {});
  Posts.associate = function(models) {
    // associations can be defined here
    // Posts belongsTo Users
    Posts.belongsTo(models.Users)
    // Posts hasMany Likes
    Posts.hasMany(models.Likes);
  };
  return Posts;
};