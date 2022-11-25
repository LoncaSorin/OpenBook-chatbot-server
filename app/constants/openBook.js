const { OPENBOOK_API_URL } = require("../../config/index.js");

const OPENBOOK_POST_QUESTION = `${OPENBOOK_API_URL}/artifacts/:artefactId/query`;

module.exports = {
  OPENBOOK_POST_QUESTION,
}
