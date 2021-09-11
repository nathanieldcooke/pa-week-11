'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER
    },
    biography: {
      type: DataTypes.TEXT
    },
    hairColorId: {
      type: DataTypes.INTEGER,
      references: { model: 'HairColors' },
      allowNull: false,
    },
  }, {});
  Person.associate = function(models) {
    // associations can be defined here
    Person.belongsTo(models.HairColor, { foreignKey: 'hairColorId' });
  };
  return Person;
};