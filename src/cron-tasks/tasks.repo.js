const { db } = require("../../models/index");
const { Transaction } = require('sequelize');
const { logger } = require("../lib/logger");

const getWaitingTaskAndSelect = async () => {
  let task;
  
  try {
    await db.sequelize.transaction(
      {
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      },
      async (t) => {
        task = await db.Task.findAll(
          {
            where: {
              status: "waiting",
            },
            limit: 1,
          
          },
          { transaction: t, lock: Transaction.LOCK.UPDATE }
        );
        task = task[0]
        if (!task) {
          throw new Error("All tasks finished")
        }

        const updatedTask = await db.Task.update(
          { 
            status: "process", 
            launchTime: db.sequelize.fn('NOW'), 
            serverId: process.env.PORT, 
            seqNum: task.seqNum + 1 
          },
          {
            where: {
              id: task.id,
              seqNum: task.seqNum
            },
            // returning: true,
            // plain: true
          },
          { transaction: t }
        );

        // console.log(updatedTask)
      });
  } catch (err) {
    console.log(err)
    task = null
  }

  return task;
};

const finishTask = async id => {
  await db.Task.update(
    { status: "done" },
    {
      where: {
        id,
      },
    },
  );

  await db.History.create({ task_id: id })
}

const getTasks = async () => {
  const tasks = await db.Task.findAll({attributes: ["name", "status", "serverId", "launchTime"]})
  return tasks.map(t => {return {...t.dataValues}}) 
}

const setAllTasksToWaiting = async () => {
  await db.Task.update(
    { status: "waiting" },
    {
      where: {
      }
    }
  );
}

module.exports = { getWaitingTaskAndSelect, finishTask, getTasks, setAllTasksToWaiting };
