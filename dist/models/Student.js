"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 255], msg: 'name must be at least 3 characters long' },
        },
      },
      surname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 255], msg: 'surname must be at least 3 characters long' },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'e-mail already exists',
        },
        validate: {
          isEmail: { msg: 'E-mail adress is invalid' },
        },
      },
      age: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be an integer',
          },
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        validate: {
          isFloat: { msg: 'Weight must be a float' },
        },
      },
      height: {
        type: _sequelize2.default.FLOAT,
        validate: {
          isFloat: { msg: 'Weight must be a float' },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' })
  }
} exports.default = Student;
