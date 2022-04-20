import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          errors: 'Email or password is required',
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({
          errors: 'user not found',
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          errors: 'password is incorrect',
        });
      }

      const { id } = user;
      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
      );

      return res.json({ token });
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

export default new TokenController();
