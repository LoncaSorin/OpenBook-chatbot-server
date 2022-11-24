const initExpress = require('./config/express.js');
const express = require("express");

const app = express();
const port = 5000;

initExpress(app);

app.use(require('./app/modules/artefacts/routes'));

app.listen(port, () => {
  console.log(`The chat server is listening on port ${port}`)
})
