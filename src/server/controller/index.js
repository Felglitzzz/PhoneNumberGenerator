/* eslint-disable consistent-return */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-destructuring */
import RepositoryInstance from '../database';

let arrayOfPhoneNumbers = [];
let phoneNumberCount = 20;
const initialLimit = 100000000;
const finalLimit = 1000000000;
class PhoneNumberController {
  static generate(count) {
    if (count === 0) return 1;
    const generatedNum = Math.floor(initialLimit + (Math.random() * (finalLimit - initialLimit)));
    const value = `${0}${generatedNum}`;
    arrayOfPhoneNumbers.push(value);
    return PhoneNumberController.generate(count - 1);
  }

  static async generatePhoneNumber(req, res) {
    if (req.body.hasOwnProperty('phoneNumberCount')) {
      if (req.body.phoneNumberCount <= 0) {
        return res.status(400).send({
          message: 'phoneNumberCount cannot be less than 1',
        });
      }
      phoneNumberCount = req.body.phoneNumberCount;
    }
    if (phoneNumberCount > 20) {
      return res.status(422).send({
        message: 'only 20 numbers can be generated',
      });
    }
    const response = PhoneNumberController.generate(phoneNumberCount);
    if (response === 1) {
      const formattedPhoneNumberArray = `${arrayOfPhoneNumbers.join(',')},`;
      RepositoryInstance.save(formattedPhoneNumberArray);
      res.status(200).send({
        message: `${phoneNumberCount} phone numbers generated`,
        data: formattedPhoneNumberArray,
      });
      arrayOfPhoneNumbers = [];
      phoneNumberCount = 20;
      return;
    }
    return res.send({
      message: 'something went wrong',
    });
  }

  static async get(req, res) {
    const contents = RepositoryInstance.read();
    const trimContents = contents.replace(/(^,)|(,$)/g, '');
    const length = trimContents.split(',').length;
    if (trimContents === '' && length === 1) {
      return res.status(404).send({
        message: 'content not found',
      });
    }
    return res.status(200).send({
      message: 'file contents successfully retrieved',
      data: trimContents,
      length,
    });
  }
}

export default PhoneNumberController;
