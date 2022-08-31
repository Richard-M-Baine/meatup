'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Attendances', [

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
    return queryInterface.bulkDelete('Attendances', {
      status: {
        [Op.in]:['member','pending','waitlist']
      }
    })
    
  }
};
