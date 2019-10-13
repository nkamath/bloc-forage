'use strict';

const faker = require("faker");

 let ingredients = [];

 for(let i = 1 ; i <= 15 ; i++){
  ingredients.push({
     name: faker.hacker.noun(),
     source: faker.hacker.abbreviation(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Ingredients", ingredients, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete("Ingredients", null, {});
  }
};
