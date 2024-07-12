require('dotenv').config()
const bodyParser = require("body-parser");
const express = require("express");
const { balanceRouter } = require("./balances/balances.controller");
const { apiErrorHandler } = require("./lib/error");
const { init } = require("../models/index");
const { logRequest } = require("./lib/logger");

require('dotenv').config()

async function main() {
  if (process.env.MIGRATE_AT_START) {
    await init()
  }

  const app = express();

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  app.use(logRequest)

  app.use("/balance", balanceRouter);

  app.use(apiErrorHandler)

  app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
  });
}

main();
