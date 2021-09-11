'use strict';
module.exports = (sequelize, DataTypes) => {
  const HairColor = sequelize.define('HairColor', {
    color: { 
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {});
  HairColor.associate = function(models) {
    // associations can be defined here
    HairColor.hasMany(models.Person, { foreignKey: 'hairColorId' });
  };
  return HairColor;
};