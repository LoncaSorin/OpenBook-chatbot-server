const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

function initExpress(app) {
  app.use(cors());
  app.options('*', cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }));
  app.use(methodOverride());

  app.use((req, res, next) => {
    req.resources = req.resources || {};
    next();
  });
}

module.exports = initExpress;
