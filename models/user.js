const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

// Вывод сообщений об ошибках:
const {
  WRONG_EMAIL_OR_PASSWORD,
  WRONG_EMAIL,
} = require('../utils/messegeConstants');

const { Schema } = mongoose;

const UnauthorizedErr = require('../errors/UnauthorizedErr');

// Создание схемы пользователя:
const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findOne(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedErr(WRONG_EMAIL_OR_PASSWORD));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedErr(WRONG_EMAIL_OR_PASSWORD));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
