const { db } = require("../../models/index")
const { Op } = require("sequelize");

const getUserBalance = async (userId) => {
  const user = await db.User.findOne({
    attributes: ["balance"],
    where: {
      id: userId,
    },
  });
  return user?.balance;
};

const changeUserBalance = async (userId, amount) => {
  const updatedInfo = await db.User.update({
    balance: db.sequelize.literal(`balance + ${amount}`)
  }, {
    where: {
      id: userId,
      balance: {
        [Op.gte]: Math.max(0, -amount)
      }
    },
    returning: true,
    plane: true
  })
  return updatedInfo
};

module.exports = { getUserBalance, changeUserBalance };
