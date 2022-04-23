class HomeController {
  async index(req, res) {
    try {
      return res.status(200).json({
        message: 'Working',
      });
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

export default new HomeController();
