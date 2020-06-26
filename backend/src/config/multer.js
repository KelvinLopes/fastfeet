import multer from 'multer';
import crypt from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      crypt.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
