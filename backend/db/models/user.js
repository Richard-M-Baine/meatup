'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: {type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[1,100]
      }
    },

    lastName: {type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len: [1,100]
      }
    },
    username: {type:DataTypes.STRING,
      allowNull:false
    },
    hashedPassword: {type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[60,60]
      }
    },
    email:  {type:DataTypes.STRING,
type: DataTypes.STRING,
allowNull:false,
validate: {
  len: [3,256],
  isEmail: true
}
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};