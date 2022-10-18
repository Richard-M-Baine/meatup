'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('GroupImages', [

      {
        groupId: 1,
        url:"https://i.pinimg.com/originals/07/94/78/07947835513ed911eeabdca5dd8f5936.jpg",
        preview:true,
      },
      {
        groupId:2,
        url: "asdfsadfasdf",
        preview:false,
      },
      {
        groupId:3,
        url:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.geekalerts.com%2Fu%2FLittle-Fat-Cthulhu-Chess-Set.jpg&imgrefurl=https%3A%2F%2Fwww.geekalerts.com%2Fcthulhu-custom-chess-set%2F&tbnid=agt6EqLwd2DEiM&vet=12ahUKEwjP4a2Oy-r6AhVQrXIEHcW2ALAQMygSegUIARDQAQ..i&docid=b-eVYw74-QgMdM&w=584&h=369&q=cthulhu%20chess&ved=2ahUKEwjP4a2Oy-r6AhVQrXIEHcW2ALAQMygSegUIARDQAQ",
        preview:false
      },
      {groupId:1,
        url:'smilingGrouppicture4',
      preview:false
      },
      {
        groupId:2,
        url:'smilingGrouppicture5',
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