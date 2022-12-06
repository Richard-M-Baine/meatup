
'use strict';

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code


// add options object to up and down functions:
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('table-name', {
        // ...
    }, options);    // add options object here
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('table-name', options); // and here
  }
};
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model: 'Groups',
          key: 'id'
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull:false
      },
      preview: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GroupImages');
  }
};