'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Items',
    [{
      name: 'IphoneX',
      brand: 'Apple',
      codeitem: 'HP0234',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mi 5S',
      brand: 'Xiaomi',
      codeitem: 'SW0923',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Iphone8',
      brand: 'Apple',
      codeitem: 'HP0876',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Galaxy S8',
      brand: 'Samsung',
      codeitem: 'LP6543',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Q6 Astro Black',
      brand: 'LG',
      codeitem: 'LP0421',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
