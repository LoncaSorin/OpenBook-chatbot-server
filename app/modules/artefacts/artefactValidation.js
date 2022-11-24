const lodash = require("lodash");
const missingArtefactId = require("../../constants/errorCodes.js").missingArtefactId;

function validateCreateArtefact(req, res, next) {
  try {
    const { artefactId } = lodash.pick(req.body, ['artefactId']);

    if (!artefactId) {
      return next(missingArtefactId);
    }

    req.resources.artefactId = artefactId;

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports.validateCreateArtefact = validateCreateArtefact;
