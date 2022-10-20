'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, { foreignKey: 'organizerId', as: 'Organizer'})
      Group.hasMany(models.Event, {foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })
      Group.hasMany(models.Venue, {foreignKey: 'groupId', onDelete: 'CASCADE', hooks: true })

      Group.hasMany(models.GroupImage, {foreignKey: 'groupId', as: 'previewImage', onDelete: 'CASCADE', hooks: true })
      Group.hasMany(models.GroupImage, { foreignKey: 'groupId', as: 'images', onDelete: 'CASCADE', hooks: true })



      Group.hasMany(models.Membership, {foreignKey: 'groupId' , onDelete: 'CASCADE', hooks: true })
    }
  }
  Group.init({
    organizerId: {type:DataTypes.INTEGER,
      allowNull:false
    },
    name: {type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [5,60]
      }

    },
    about:{ type:DataTypes.STRING,
      allowNull:false,
      validate: {
        minError(value){
          if (value.length < 50){
            throw new Error ('About must be 50 characters or more')
          }
        }
      }
    },
    type: {type:DataTypes.STRING,
      allowNull:false,
      arrayCheck(value){
        let array = ['Online', 'In Person']
        if (!array.includes(value)){
          throw new Error('Type must be Online or In person')
        }
      }
    },
    private: {type:DataTypes.BOOLEAN,
      allowNull:false
    },
    city: {type:DataTypes.STRING,
      allowNull:false},
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,2],
        validState(value){
          let validStates =
          [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
          'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

          if (!validStates.includes(value.toUpperCase())){
            throw new Error('State must be valid')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};