import Student from '../models/Student';

class HomeController {
  async index(req, res) {
    const newStudent = await Student.create({
      name: 'Socr',
      surname: 'Ates',
      email: 'socrates@email.com',
      age: 325,
      weight: 10,
      height: 2.5,
    });
    res.status(200).json(newStudent);
  }
}

export default new HomeController();
