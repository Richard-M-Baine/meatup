'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('GroupImages', [

      {
        groupId: 1,
        url:'/.smilingGrouppicture1',
        preview:true,
      },
      {
        groupId:2,
        url:'/.smilingGrouppicture2',
        preview:false,
      },
      {
        groupId:3,
        url:'/.smilingGrouppicture3',
        preview:false
      },
      {groupId:1,
        url:'/.smilingGrouppicture4',
      preview:false
      },
      {
        groupId:2,
        url:'/.smilingGrouppicture5',
        preview:false
      }

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupImages', {
      preview: {
        [Op.in]:[true,false]
      }
    })
    
  }
};