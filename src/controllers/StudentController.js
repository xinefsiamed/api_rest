import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [[Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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

      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
        order: [[Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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
      const student = await Student.create(req.body);

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

      const student = await Student.findByPk(id);

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

      const student = await Student.findByPk(id);

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

export default new StudentController();
