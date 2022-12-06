'use strict';


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'GroupImages'; 
    return await queryInterface.bulkInsert(options, [

      {
        groupId: 1,
        url:"https://i.pinimg.com/originals/07/94/78/07947835513ed911eeabdca5dd8f5936.jpg",
        preview:true,
      },
      {
        groupId:2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-k_MzS6tLUeL2zyt6sx_f8Bcuew1ylYETQ&usqp=CAU",
        preview:true,
      },
      {
        groupId:3,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oHc_w3hk86x-47ud0u5KTceqCD0_-G3W2A&usqp=CAU",
        preview:true
      },
      {groupId:1,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmdtWZTkgHnVyGCq0ixpWGf7JhfFeguzMLHw&usqp=CAU",
      preview:false
      },
      {
        groupId:2,
        url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIEKA_S4C_TglqD1Hkt0LtXtou25kljMXQw&usqp=CAU",
        preview:false
      }

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'GroupImages'; 
    return queryInterface.bulkDelete(options, 'GroupImages', {
      preview: {
        [Op.in]:[true,false]
      }
    })
    
  }
};