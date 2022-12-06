
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
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venueId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Venues',
          key: 'id'
        }
      },
      groupId: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      type: {
        type: Sequelize.STRING,
        allowNull:false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull:false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Events');
  }
};