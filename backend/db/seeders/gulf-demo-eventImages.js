'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('EventImages', [

      {
        eventId: 1,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIEKA_S4C_TglqD1Hkt0LtXtou25kljMXQw&usqp=CAU",
        preview:true,
      },
      {
        eventId:2,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-k_MzS6tLUeL2zyt6sx_f8Bcuew1ylYETQ&usqp=CAU",
        preview:true,
      },
      {
        eventId:3,
        url:"https://media.istockphoto.com/photos/tentacled-horror-scene-3d-illustration-picture-id1180024648?b=1&k=20&m=1180024648&s=170667a&w=0&h=opCIdiXwjN6O0EbYCvPuBvGxhXvBFZPepJh7_vUpGNM=",
        preview:true
      },
      {eventId:4,
        url:"https://cdn.pixabay.com/photo/2017/03/20/19/44/dog-2160149__340.jpg",
      preview:true
      },
      {
        eventId:5,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf4QYihCR2Wpa5R0jnbJXJYUtZNpp5IHyh5w&usqp=CAU",
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