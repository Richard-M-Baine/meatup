'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Events',[
    {
      name: 'Cthulhu cult fridays',
      description:'first get together with neigbhorhood cultists.',
      type: 'In Person',
      venueId:1,
      groupId:1,
      capacity: 20,
      price: 10.00,
      startDate: new Date('2022-11-19 20:00:00'),
      endDate: new Date('2022-11-19 21:00:00')
    },
    {
      name: 'Tennis Group Twentith Meet and Greet',
      description: 'a brief skype get together',
      venueId:null,
      groupId:2,
      type: 'Online',
      capacity: 20,
      price: 10.00,
      startDate: new Date('2022-10-19 20:00:00'),
      endDate: new Date('2022-10-19 21:00:00')
    },
    {
      name: 'Abdul alhazred memorial lecture',
      description: 'a lecture about the life and times of this great man',
      type: 'In Person',
      venueId: 2,
      groupId:1,
      capacity:20,
      price:10.00,
      startDate: new Date('2022-10-29 20:00:00'),
      endDate: new Date('2022-10-29 21:00:00')

    },
    {
      name: 'Tennis with people who are better than you',
      description: 'guaranteed to end 6-0 6-0 or your money back!',
      venueId:3,
      groupId:2,
      type: 'In Person',
      capacity: 20,
      price: 10.00,
      startDate: new Date('2022-10-09 20:00:00'),
      endDate: new Date('2022-10-09 21:00:00')
    },
    {
      name: 'Chess with people who are better than you',
      description: 'guaranteed to be mated within 20 moves or your money back!',
      venueId: 4,
      groupId:3,
      type: 'In Person',
      capacity:20,
      price: 100.00,
      startDate: new Date('2022-10-02 20:00:00'),
      endDate: new Date('2022-10-02 21:00:00')

    }




  ],{} );
},

down: async (queryInterface, Sequelize) => {
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete('Events', {
    capacity: {
      [Op.in]:[20]
    }
  })
  
}
};
