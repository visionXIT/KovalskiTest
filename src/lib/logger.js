const logger = {
  log: (type, msg) => {
    const now = new Date()
    console.log("LOG [" + type + "] [" + now + "] " + msg)
  },

  info: (msg) => {
    logger.log("INFO", msg)
  },

  error: (msg) => {
    logger.log("ERROR", msg)
  }
}

const logRequest = (req, res, next) => {
  logger.info(req.url + " :: (req.body)" + JSON.stringify(req.body) + " ;; (req.params)" + JSON.stringify(req.params))
  next()
}

module.exports = {logger, logRequest}