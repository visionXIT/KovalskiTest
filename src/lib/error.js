const { logger } = require("./logger");

class ApiError {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }

  toString() {
    return this.code + " :: " + this.msg
  }
}

const apiErrorHandler = async (err, req, res, next) => {
  logger.error(err)

  if (err instanceof ApiError) {
    res.status(err.code).json({ msg: err.msg });
  } else {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { ApiError, apiErrorHandler, asyncHandler };
