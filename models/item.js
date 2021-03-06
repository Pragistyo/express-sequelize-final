'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
              type: DataTypes.STRING,
              validate:{
                      len: {
                             args:[6,6],
                             msg: "Code Item harus diisi dengan 6 karakter"
                           },
                       is: {
                          args: /(HP|SW|LP)\d{4}/,
                          msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti dengan 4 digit angka"
                          }
                        }
             }
  }, {
    hooks: {
      beforeDestroy: function(models) {
        // models.SupplierItem.destroy({where:{ItemId:Item.id}})
      }
    }
  });
  Item.associate = models=>{
    Item.belongsToMany(models.Suppliers,{through:'SupplierItem',foreignKey:'ItemId'})
    Item.hasMany(models.SupplierItem,{onDelete : 'cascade', hooks: true})
  }

  return Item;
};
