"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);

      const { id, name, email } = newUser;

      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await _User2.default.findByPk(req.params.id);

      const { id, name, email } = user;
      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }

      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(204).json({
          errors: ['User not found'],
        });
      }

      const updatedUser = await user.update(req.body);

      const { id, name, email } = updatedUser;

      return res.status(200).json({ id, name, email });
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // delete
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!req.userId) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      await user.destroy();

      return res.status(200).json({
        message: 'User deleted',
      });
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

exports. default = new UserController();
