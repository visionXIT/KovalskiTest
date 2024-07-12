const { logger } = require("../lib/logger");
const {
  getWaitingTaskAndSelect,
  finishTask,
  getTasks,
  setAllTasksToWaiting,
} = require("./tasks.repo");

const runTasksUntilEmpty = async () => {
  let freeTask = await getWaitingTaskAndSelect();
  if (freeTask) {
    setTimeout(async () => {
      logger.info("Task finished" + freeTask.name);
      await finishTask(freeTask.id);
      await runTasksUntilEmpty();
    }, freeTask.timeInSeconds * 1000);
  } else {
    logger.info("Task execution ended");
  }
};

const getTasksStatus = async () => {
  let tasks = await getTasks();

  for (let t of tasks) {
    const time = Math.abs(new Date() - new Date(tasks[0].launchTime));
    t.timeSinceLaunch =
      Math.floor(time / 1000 / 3600) +
      ":" +
      (Math.floor(time / 1000 / 60) % 60) +
      ":" +
      (Math.floor(time / 1000) % 60) +
      " -- " +
      (time % 1000);
  }
  return tasks;
};

const prepareTasks = async () => {
  const tasks = await getTasks();
  if (tasks.find((t) => t.status !== "done")) {
    return;
  }

  await setAllTasksToWaiting();
};

module.exports = { runTasksUntilEmpty, getTasksStatus, prepareTasks };
