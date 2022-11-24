const express = require("express");
const artefactCtrl = require("./artefactController.js");
const { validateCreateArtefact } = require("./artefactValidation.js");

const router = express.Router();

router.post('/createArtefact',
  validateCreateArtefact,
  artefactCtrl.createArtefact);

module.exports = router;
