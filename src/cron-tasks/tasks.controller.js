const cron = require("node-cron");
const { logger } = require("../lib/logger");
const { Router } = require("express");
const { asyncHandler } = require("../lib/error");
const {
  runTasksUntilEmpty,
  getTasksStatus,
  prepareTasks,
} = require("./tasks.service");

cron.schedule("* */5 * * * *", async () => {
  logger.info("Starting preparing tasks");
  await prepareTasks();
  logger.info("All tasks statuses set to waiting");

  logger.info("Tasks execution started");
  await runTasksUntilEmpty();
});

const tasksRouter = Router();

tasksRouter.post(
  "/startWork",
  asyncHandler(async (_, res) => {
    await runTasksUntilEmpty();
    res.sendStatus(200);
  })
);

tasksRouter.get(
  "/getTasksStatus",
  asyncHandler(async (_, res) => {
    const tasks = await getTasksStatus();
    res.json({ tasks });
  })
);

module.exports = { tasksRouter };
