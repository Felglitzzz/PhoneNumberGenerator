import express from 'express';
import PhoneNumberController from '../controller';
import Middleware from '../middleware';

const router = express.Router();

router.get('/generate', Middleware.checkFileSize, PhoneNumberController.generatePhoneNumber);
router.get('/phone', PhoneNumberController.get);


export default router;
