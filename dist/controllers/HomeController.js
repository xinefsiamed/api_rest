"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
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

exports. default = new HomeController();
