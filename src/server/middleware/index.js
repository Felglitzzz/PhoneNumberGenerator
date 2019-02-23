/* eslint-disable class-methods-use-this */
import RepositoryInstance from '../database';

class Middleware {
  static checkFileSize(req, res, next) {
    const fileSize = RepositoryInstance.checkFileSize();
    if (Math.floor(fileSize) > 3) {
      return res.status(422).send({
        message: 'file should not exceed 3mb',
      });
    }
    return next();
  }
}

export default Middleware;
