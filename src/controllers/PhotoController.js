import multer from 'multer';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  async store(req, res) {
    try {
      return upload(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            errors: [err.code],
          });
        }

        return res.status(200).json(req.file);
      });
    } catch (err) {
      return res.status(400).json(null);
    }
  }
}

export default new PhotoController();
