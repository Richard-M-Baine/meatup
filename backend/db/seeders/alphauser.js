'use strict';
const bcrypt = require("bcryptjs");


// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'; 
    return await queryInterface.bulkInsert(options,[
      {
      firstName: 'Bilbo',
      lastName: 'Baggins',
      email: 'bilbo@gmail.com',
      username: 'loseRings',
      hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Frodo',
        lastName: 'Baggins',
        email: 'frodo@gmail.com',
        username: 'walktomordor',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Cthulhu',
        lastName: 'Kassogtha',
        email: 'cthulhu@oldones.com',
        username: 'cthulhufhtagn',
        hashedPassword: bcrypt.hashSync('insanity')
      },
      {
        firstName: 'Fake',
        lastName: 'userFour',
        email: 'userFour@gmail.com',
        username: 'userfour',
        hashedPassword: bcrypt.hashSync('passwordfour')
      },
      {
        firstName: 'Fake',
        lastName: 'userFive',
        email: 'userFive@gmail.com',
        username: 'userfive',
        hashedPassword: bcrypt.hashSync('passwordfive')
      },
      {
        firstName: 'Fake',
        lastName: 'usersix',
        email: 'usersix@gmail.com',
        username: 'usersix',
        hashedPassword: bcrypt.hashSync('passwordsix')
      }

    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users'; 
    return queryInterface.bulkDelete(options, 'Users', {
      email: {
        [Op.in]:['bilbo@gmail.com','frodo@gmail.com','cthulhu@oldones.com','userFour@gmail.com','userFive@gmail.com','usersix@gmail.com']
      }
    })
    
  }
};
