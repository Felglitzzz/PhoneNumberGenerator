/* eslint-disable consistent-return */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-destructuring */
import RepositoryInstance from "../database";

let arrayOfPhoneNumbers = [];
let phoneNumberCount = 20;
const initialLimit = 100000000;
const finalLimit = 1000000000;
class PhoneNumberController {
  static generate(count) {
    if (count === 0) return 1;
    const generatedNum = Math.floor(
      initialLimit + Math.random() * (finalLimit - initialLimit)
    );
    const value = `${0}${generatedNum}`;
    arrayOfPhoneNumbers.unshift(value);
    return PhoneNumberController.generate(count - 1);
  }

  static async generatePhoneNumber(req, res) {
    if (req.body.hasOwnProperty("phoneNumberCount")) {
      if (req.body.phoneNumberCount <= 0) {
        return res.status(400).send({
          message: "PhoneNumberCount cannot be less than 1"
        });
      }
      phoneNumberCount = req.body.phoneNumberCount;
    }

    if (phoneNumberCount > 20) {
      res.status(422).send({
        message: "Only 20 numbers can be generated per time"
      });
      phoneNumberCount = 20;
      return;
    }
    const response = PhoneNumberController.generate(phoneNumberCount);
    if (response === 1) {
      const formattedPhoneNumberArray = `${arrayOfPhoneNumbers.join(",")},`;
      RepositoryInstance.save(formattedPhoneNumberArray);
      res.status(200).send({
        message: `${phoneNumberCount} phone numbers generated`,
        data: formattedPhoneNumberArray,
        length: phoneNumberCount
      });
      arrayOfPhoneNumbers = [];
      phoneNumberCount = 20;
      return;
    }
    return res.send({
      message: "something went wrong"
    });
  }

  static async get(req, res) {
    const contents = RepositoryInstance.read();
    const trimContents = contents.replace(/(^,)|(,$)/g, "");
    const length = trimContents.split(",").length;
    const orderContents = trimContents
      .split(",")
      .reverse()
      .join(",");
    if (trimContents === "" && length === 1) {
      return res.status(404).send({
        message: "content not found"
      });
    }
    return res.status(200).send({
      message: "file contents successfully retrieved",
      data: orderContents,
      length
    });
  }

  static getWelcomeMessage(req, res) {
    res.status(200).send({
      message: "welcome to random phone generator api"
    });
  }
}

export default PhoneNumberController;
