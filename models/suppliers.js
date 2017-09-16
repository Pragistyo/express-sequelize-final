'use strict';
module.exports = function(sequelize, DataTypes) {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Suppliers.associate = models=>{
    Suppliers.belongsToMany(models.Item,{through:'SupplierItem',foreignKey:'SupplierId'})
    Suppliers.hasMany(models.SupplierItem)
    // Suppliers.hasMany(models.Item,{through:"SupplierItem",foreignKey:"SupplierId"})
  }
  return Suppliers;
};
