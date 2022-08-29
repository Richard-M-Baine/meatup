'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendee.belongsTo(models.User, { foreignKey: 'userId' })
      Attendee.belongsTo(models.Event, { foreignKey: 'eventId' })
    }
  }
  Attendance.init({
    eventId: {type:DataTypes.INTEGER,
      allowNull:false},

    userId: {type:DataTypes.INTEGER,
      allowNull: false},

    status: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        statusCheck(value){
          let goodArray = ['waitlist','member','pending']
          if (!goodArray.includes(value)){
            throw new Error('Status has to be either waitlist, member, or pending')
          }
        }
      }
  },
}, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};