'use strict';


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('EventImages', [

      {
        eventId: 1,
        url:"https://cdn.pixabay.com/photo/2022/10/16/13/53/early-morning-7525151_960_720.jpg",
        preview:true,
      },
      {
        eventId:2,
        url:"https://cdn.pixabay.com/photo/2022/09/11/14/43/whale-7446905_960_720.jpg",
        preview:true,
      },
      {
        eventId:3,
        url:"https://cdn.pixabay.com/photo/2017/03/20/19/44/dog-2160149__340.jpg",
        preview:true
      },
      {eventId:4,
        url:"https://cdn.pixabay.com/photo/2017/03/20/19/44/dog-2160149__340.jpg",
      preview:true
      },
      {
        eventId:5,
        url:"https://cdn.pixabay.com/photo/2022/10/05/20/43/hyacinth-macaw-7501470_960_720.jpg",
        preview:true
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