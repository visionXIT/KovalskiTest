const { ApiError } = require("../lib/error")
const { getUserBalance, setUserBalance } = require("./balances.repo")

const updateUserBalance = async (userId, amount) => {
  const currentBalance = await getUserBalance(userId)

  if (currentBalance === null) {
    throw new ApiError(404, "User is not found")
  }

  const newBalance = currentBalance + amount

  if (newBalance < 0) {
    throw new ApiError(400, "User balance cannot be lower than 0")
  }

  await setUserBalance(userId, newBalance)
  return newBalance
}

module.exports = {updateUserBalance}