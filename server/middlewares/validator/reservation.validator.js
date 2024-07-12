const { body, validationResult } = require("express-validator");
const DB = require("../../config/postgres.config");

const postReservationValidator = () => {
  return [
    body("seats_reserved")
        .notEmpty()
        .withMessage('Le siège est obligatoire.')
        .escape()
        .trim(),
  ];
};

async function validateReservation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { postReservationValidator, validateReservation };