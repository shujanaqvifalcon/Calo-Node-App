/**
 * calo Assessment
 * @author Shuja Naqvi
 */

const { check, validationResult } = require('express-validator');

exports.validateJobCreation = [
  check('title', 'Job title is required.')
    .notEmpty()
    .trim()
    .withMessage('Job title cannot be empty.'),

  check(
    'salaryExpectation',
    'Salary expectation is required and should be a number.'
  )
    .notEmpty()
    .isNumeric()
    .withMessage('Salary expectation must be a valid number.'),

  check(
    'experience',
    'Experience is required and should be a positive number of years.'
  )
    .notEmpty()
    .isNumeric()
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number.')
];

/*
======================
Result Check
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request using previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
