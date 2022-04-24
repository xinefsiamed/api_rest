import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  store(req, res) {
    try {
      return upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            errors: [err.code],
          });
        }

        try {
          const { originalname, filename } = req.file
          const { student_id } = req.body
          const photo = await Photo.create({ originalname, filename, student_id });

          return res.status(200).json(photo);

        } catch (err) {
          return res.status(400).json({
            errors: ['Student not found']
          })
        }

      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new PhotoController();
