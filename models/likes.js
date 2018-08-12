'use strict';
module.exports = (sequelize, DataTypes) => {
  var Likes = sequelize.define('Likes', {}, {});
  Likes.associate = function(models) {
    // associations can be defined here
    // Likes belongsTo Posts
    Likes.belongsTo(models.Posts)
  };
  return Likes;
};