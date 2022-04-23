import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);

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
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

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

      const user = await User.findByPk(req.userId);

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
      const user = await User.findByPk(req.userId);

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

export default new UserController();
