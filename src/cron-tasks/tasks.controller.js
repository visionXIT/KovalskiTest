const cron = require('node-cron')
const { logger } = require('../lib/logger')
const { Router } = require('express')
const { asyncHandler } = require('../lib/error')
const { runTasksUntilEmpty, getTasksStatus } = require('./tasks.service')
const { setAllTasksToWaiting } = require('./tasks.repo')

cron.schedule(
  "30 * * * * *",
  async () => {
    logger.info("Tasks execution started")
    await runTasksUntilEmpty()
//     setTimeout(async () => {
// x    }, Math.random() * 2000);
  }
)

cron.schedule(
  "20 * * * * *",
  async () => {
    logger.info("Starting preparing tasks")

    await setAllTasksToWaiting()
    
    logger.info("All tasks statuses set to waiting")
  }
)

const tasksRouter = Router()

tasksRouter.post("/startWork", asyncHandler(async (_, res) => {
  await runTasksUntilEmpty()
  res.sendStatus(200)
}))

tasksRouter.get("/getTasksStatus", asyncHandler(async (_, res) => {
  const tasks = await getTasksStatus()
  res.json({tasks})
}))

module.exports = {tasksRouter}