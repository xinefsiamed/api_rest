"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    try {
      const students = await _Student2.default.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [[_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename']
        }
      });

      return res.status(200).json(students);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'missing id' });
      }

      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [[_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['url', 'filename']
        }
      });

      if (!student) {
        return res.status(400).json({ message: 'student not found' });
      }

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'missing id' });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({ message: 'student not found' });
      }

      const updatedStudent = await student.update(req.body);

      return res.status(200).json(updatedStudent);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  async delete(req, res) {
    try {
      console.log(req.params);

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'missing id' });
      }

      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({ message: 'student not found' });
      }

      await student.destroy();

      return res.status(200).json({
        deleted: true,
      });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }
}

exports. default = new StudentController();
