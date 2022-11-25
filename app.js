const initExpress = require('./config/express.js');
const express = require("express");
const { PORT } = require("./config/index.js");

const app = express();
const port = PORT;

initExpress(app);

app.use(require('./app/modules/artefacts/routes'));
app.use(require('./app/modules/messages/routes'));

app.listen(port, () => {
  console.log(`The chat server is listening on port ${port}`)
})
