import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      });
    }
  }

  // index
  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // show
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(204).json({
          errors: ['User not found'],
        });
      }

      const updatedUser = await user.update(req.body);

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(400).json(null);
    }
  }

  // delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      await user.destroy();

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

export default new UserController();
