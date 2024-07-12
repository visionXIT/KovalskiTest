const { ApiError } = require("../lib/error");

const { getUserBalance, changeUserBalance } = require("./balances.repo");

const updateUserBalance = async (userId, amount) => {
  const currentBalance = await getUserBalance(userId);

  if (currentBalance == null || currentBalance == undefined) {
    throw new ApiError(404, "User is not found");
  }

  const updatedInfo = await changeUserBalance(userId, amount);

  if (updatedInfo[0] === 0) {
    throw new ApiError(400, "User cannot have a negative balance");
  }

  return updatedInfo[1][0].dataValues.balance;
};

module.exports = { updateUserBalance };
