'use strict';


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Attendances'; 
    return await queryInterface.bulkInsert(options, [

      {
        eventId: 1,
        userId:1,
        status:'pending'
      },
      {
        eventId:2,
        userId:2,
        status:'member'
      },
      {
        eventId:3,
        userId:3,
        status:'member'
      },
      {eventId:4,
      userId:4,
      status:'member'
      },
      {
        eventId:5,
        userId:5,
        status:'member'
      }

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Attendances'; 
    return queryInterface.bulkDelete(options, 'Attendances', {
      status: {
        [Op.in]:['member','pending','waitlist']
      }
    })
    
  }
};
