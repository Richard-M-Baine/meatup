'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasMany(models.Attendance, {foreignKey: 'eventId'})
      Event.belongsTo(models.Venue, {foreignKey: 'venueId'})
      Event.belongsTo(models.Group, {foreignKey: 'groupId'})
    }
  }
  Event.init({
    venueId: {type:DataTypes.INTEGER,
    },
    groupId: {type:DataTypes.INTEGER,
      allowNull:false},
    name: {type:DataTypes.STRING,
      allowNull:false,
      validate: {
        min: 5
      }
    },
    description: {type:DataTypes.STRING,
      allowNull:false},

    type: {type:DataTypes.STRING,
      allowNull:false,
      validate: {
        arrayCheck(value){
          let array = ['Online', 'In Person']
          if (!array.includes(value)){
            throw new Error('Type must be Online or In person')
          }
        }
      }
    },
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: {type:DataTypes.DATE,
      validate: {
        isFuture(value){
          if (this.startDate > value){
            throw new Error('End date is less than start date')
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};