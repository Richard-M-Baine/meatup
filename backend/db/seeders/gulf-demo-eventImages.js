'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('EventImages', [

      {
        eventId: 1,
        url:'/.smilingpicture1',
        preview:true,
      },
      {
        eventId:2,
        url:'/.smilingpicture2',
        preview:false,
      },
      {
        eventId:3,
        url:'/.smilingpicture3',
        preview:false
      },
      {eventId:4,
        url:'/.smilingpicture4',
      preview:false
      },
      {
        eventId:5,
        url:'/.smilingpicture5',
        preview:false
      }

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventImages', {
      preview: {
        [Op.in]:[true,false]
      }
    })
    
  }
};