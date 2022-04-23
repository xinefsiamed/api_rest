import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 255], msg: 'name must be at least 3 characters long' },
        },
      },
      surname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: { args: [3, 255], msg: 'surname must be at least 3 characters long' },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'e-mail already exists',
        },
        validate: {
          isEmail: { msg: 'E-mail adress is invalid' },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be an integer',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: { msg: 'Weight must be a float' },
        },
      },
      height: {
        type: Sequelize.FLOAT,
        validate: {
          isFloat: { msg: 'Weight must be a float' },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }
}
