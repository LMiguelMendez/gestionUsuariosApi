const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre no puede estar vacío'
      },
      len: {
        args: [2, 100],
        msg: 'El nombre debe tener entre 2 y 100 caracteres'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      name: 'email_unique',
      msg: 'El email ya está registrado'
    },
    validate: {
      isEmail: {
        msg: 'El formato del email es inválido'
      },
      notEmpty: {
        msg: 'El email no puede estar vacío'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'La edad no puede ser negativa'
      },
      max: {
        args: [150],
        msg: 'La edad no puede ser mayor a 150'
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false
});

module.exports = UserModel;