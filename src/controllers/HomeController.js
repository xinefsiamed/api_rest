class HomeController {
  index(req, res) {
    res.status(200).json({
      tudoNice: true,
    });
  }
}

export default new HomeController();
