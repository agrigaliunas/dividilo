const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    const uniqueErrors = [...new Set(errorMessages)];

    return res.status(400).json({
      ok: false,
      message: uniqueErrors.join(". "),
    });
  }
  next();
};

module.exports = validateRequest;
