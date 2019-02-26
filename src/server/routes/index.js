import express from "express";
import PhoneNumberController from "../controller";
import Middleware from "../middleware";

const router = express.Router();

router.post(
  "/generate",
  Middleware.checkFileSize,
  PhoneNumberController.generatePhoneNumber
);
router.get("/phone", PhoneNumberController.get);
router.get("/home", PhoneNumberController.getWelcomeMessage);

export default router;
