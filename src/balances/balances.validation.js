const { ApiError } = require("../lib/error")

const validateUpdateBalanceHandler = (body) => {
  if (!body || !body.userId || !body.amount) {
    throw new ApiError(400, "You should provide userId and amount fields as body")
  }

  if (isNaN(Number(body.userId)) || isNaN(Number(body.amount))) {
    throw new ApiError(400, "userId and amount should be numbers")
  }

  if (body.amount === 0) {
    throw new ApiError(400, "Amount cannot be 0")
  }

  return {amount: +body.amount, userId: +body.userId}
}

module.exports = {validateUpdateBalanceHandler}