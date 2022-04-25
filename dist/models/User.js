"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Field name is required',
          },

          len: {
            args: [3, 255],
            msg: 'Field name must be at least 3 characters long and less than 255 characters',
          },
        },
      },

      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Field email is not valid',
          },
        },
      },

      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },

      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Field password is required',
          },

          len: {
            args: [6, 50],
            msg: 'Field password must be at least 6 characters long and less than 50 characters',
          },
        },
      },

    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8); // eslint-disable-line
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
