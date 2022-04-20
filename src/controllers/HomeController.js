import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    try {
      const students = await Student.findAll();

      return res.status(200).json(students);
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

export default new HomeController();
