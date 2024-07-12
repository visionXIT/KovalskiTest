const { db } = require("../../models/index");

const getWaitingTaskAndSelect = async () => {
  let task;

  const updatedTask = await db.sequelize.query(`
    UPDATE "Tasks" SET status='process', "launchTime"=now(), "serverId"=${process.env.PORT} 
    WHERE id = (
      select id
      from "Tasks"
      where status='waiting'
      limit 1
      for update skip locked
    )
    returning "timeInSeconds", id, name
    `);

  if (updatedTask[0].length === 0) {
    return null;
  }

  task = { ...updatedTask[0][0] };

  return task;
};

const finishTask = async (id) => {
  await db.Task.update(
    { status: "done" },
    {
      where: {
        id,
      },
    }
  );

  await db.History.create({ task_id: id });
};

const getTasks = async () => {
  const tasks = await db.Task.findAll({
    attributes: ["name", "status", "serverId", "launchTime"],
  });
  return tasks.map((t) => {
    return { ...t.dataValues };
  });
};

const setAllTasksToWaiting = async () => {
  await db.Task.update(
    { status: "waiting" },
    {
      where: {},
    }
  );
};

module.exports = {
  getWaitingTaskAndSelect,
  finishTask,
  getTasks,
  setAllTasksToWaiting,
};
