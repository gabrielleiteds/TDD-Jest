const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken')

//rounds for the hash of bcrypt
const ROUNDS = 10;


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  hooks: {
    afterValidate: async (user) => {
      // generate uuid v4:
      user.id = uuid.v4();

      // encrypt the password:
      if (user.password)
        user.password = await bcryptjs.hash(user.password, ROUNDS);
    }
  },
  sequelize,
  tableName: 'users',
  underscored: true
});

User.prototype.comparePassword = function (password) {
  return bcryptjs.compare(password, this.password);
}

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET)
}

module.exports = User;