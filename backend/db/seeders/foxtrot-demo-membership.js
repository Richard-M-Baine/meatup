'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Memberships', [

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
    return queryInterface.bulkDelete('Memberships', {
      status: {
        [Op.in]:['member','pending','co-host']
      }
    })
    
  }
};