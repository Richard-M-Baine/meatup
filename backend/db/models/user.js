'use strict';
const bcrypt = require('bcryptjs');

const {
  Model, Validator} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    toSafeObject() {
      const { id, firstName, lastName, email } = this;
      return { id, firstName, lastName, email }
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            email: credential,
            username: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Attendance, {foreignKey: 'userId'})
      User.hasMany(models.Group, {foreignKey: 'organizerId'})
      User.hasMany(models.Membership, {foreignKey: 'userId'})
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
      allowNull:false,
      validate: {
        isNotEmail: true,
        len: [3,100]
      }
    },
    hashedPassword: {type:DataTypes.STRING.BINARY,
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
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "createdAt", "updatedAt"]
      }
    }, // probably removes most of the trouble
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword", "username","createdAt","updatedAt"] } // meets the /me current user
      },
    loginUser: {
      attributes: {}
    }},

  });
  return User;
};