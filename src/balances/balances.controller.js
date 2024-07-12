const { Router } = require("express");
const { updateUserBalance } = require("./balances.service");
const { getUserBalance } = require("./balances.repo");
const {asyncHandler} = require("../lib/error");
const { validateUpdateBalanceHandler } = require("./balances.validation");

const balanceRouter = Router();

balanceRouter.post("/update", asyncHandler(async (req, res) => {
  const { userId, amount } = validateUpdateBalanceHandler(req?.body)
  
  const changedBalance = await updateUserBalance(userId, amount);

  res.json({ changedBalance });
}));

balanceRouter.get("/get/:userId", asyncHandler(async (req, res) => {
  const userId = +req.params.userId

  const balance = await getUserBalance(userId)

  res.json({ balance })
}))

module.exports = { balanceRouter };
