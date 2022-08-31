'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Groups', [

      {
        organizerId: 1,
        name:'Cthulhu cultists anonymous',
        about:'you dont really want to know what we are up to',
        type:'In Person',
        private:false,
        city: 'Miscatonic',
        state:'MA'
      },
      {
        organizerId: 2,
        name:'Tennis Champions who never lose',
        about:'we are good at tests and are maybe cthulhu cultists too',
        type:'In Person',
        private:false,
        city: 'Insmith',
        state:'MA'
      },
      {
        organizerId: 3,
        name:'Chess champions who never lose',
        about:'Play with Schindler and Carlson.  You need to be terrible toplay',
        type:'In Person',
        private:false,
        city: 'Fridigern',
        state:'MA'
      },

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      private: {
        [Op.in]:[true,false]
      }
    })
    
  }
};
