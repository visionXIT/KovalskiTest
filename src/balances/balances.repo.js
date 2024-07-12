const { db } = require("../../models/index")

const getUserBalance = async (userId) => {
  const user = await db.User.findOne({
    attributes: ["balance"],
    where: {
      id: userId,
    },
  });
  return user?.balance;
};

const setUserBalance = async (userId, newBalance) => {
  await db.User.update(
    { balance: newBalance },
    {
      where: {
        id: userId,
      },
    }
  );
};

module.exports = { getUserBalance, setUserBalance };
