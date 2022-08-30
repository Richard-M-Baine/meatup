'use strict';

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Venues', [

      {
        groupId: 1,
        organizerId:1,
        address:'123 Ryleh lane',
        city:'Rlyeh',
        state:'WV',
        lat:49.51,
        lng: -128.34,
      },
      {
        groupId:1,
        organizerId: 2,
        address: '159 south scott plaza',
        city: 'Fort Dix',
        state: 'NJ',
        lat:40.05,
        lng: -74.40
      },
      {
        groupId:3,
        organizerId: 3,
        address: '1443 south pleasant east',
        city:'Mischatonic',
        state:'MA',
        lat:41.84,
        lng:-106.43
      },

    ],{});
  },
  

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      state: {
        [Op.in]: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
      }
    })
    
  }
};