'use strict';


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Memberships'; 
    return await queryInterface.bulkInsert(options, [

      {
        userId:1,
        groupId:1,
        status:'member',
      },
      {
      userId:2,
      groupId:2,
      status:'pending'
      },
      {
     userId:3,
     groupId:3,
     status:'member'
      },
      {
        userId:4,
        groupId:1,
        status:'member'
      }

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Memberships'; 
    return queryInterface.bulkDelete(options, 'Memberships', {
      status: {
        [Op.in]:['member','pending','co-host']
      }
    })
    
  }
};