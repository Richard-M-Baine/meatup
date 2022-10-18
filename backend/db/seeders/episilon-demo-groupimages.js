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
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-k_MzS6tLUeL2zyt6sx_f8Bcuew1ylYETQ&usqp=CAU",
        preview:true,
      },
      {
        groupId:3,
        url:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.geekalerts.com%2Fu%2FLittle-Fat-Cthulhu-Chess-Set.jpg&imgrefurl=https%3A%2F%2Fwww.geekalerts.com%2Fcthulhu-custom-chess-set%2F&tbnid=agt6EqLwd2DEiM&vet=12ahUKEwjP4a2Oy-r6AhVQrXIEHcW2ALAQMygSegUIARDQAQ..i&docid=b-eVYw74-QgMdM&w=584&h=369&q=cthulhu%20chess&ved=2ahUKEwjP4a2Oy-r6AhVQrXIEHcW2ALAQMygSegUIARDQAQ",
        preview:true
      },
      {groupId:1,
        url:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.k00QJxLEBFw10AVg2XOU9AEsD5%26pid%3DApi&f=1&ipt=51cc1504cf8100cb50ffb4d4d8437131395f3c169764dbf08b69f6cbd2c3b17c&ipo=images",
      preview:false
      },
      {
        groupId:2,
        url:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.k00QJxLEBFw10AVg2XOU9AEsD5%26pid%3DApi&f=1&ipt=51cc1504cf8100cb50ffb4d4d8437131395f3c169764dbf08b69f6cbd2c3b17c&ipo=images",
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