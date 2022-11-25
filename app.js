const initExpress = require('./config/express.js');
const express = require("express");
const { PORT } = require("./config/index.js");
const { initMysql } = require("./config/mysql");

const app = express();
const port = PORT;

initExpress(app);
const connection = initMysql();

app.set('connection', connection);

app.use(require('./app/modules/artefacts/routes'));
app.use(require('./app/modules/messages/routes'));

app.listen(port, () => {
  console.log(`The chat server is listening on port ${port}`)
})
