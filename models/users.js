'use strict';
module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    // A user hasMany Posts
    Users.hasMany(models.Posts);
  };
  return Users;
};