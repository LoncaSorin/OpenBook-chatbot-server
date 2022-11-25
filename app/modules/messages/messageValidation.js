const lodash = require("lodash");
const { incorrectFeedback, missingQuestion } = require("../../constants/errorCodes.js");
const { GOOD_ANSWER, BAD_ANSWER } = require("../../constants/general.js");

function validateUpdateMessage(req, res, next) {
  try {
    const { messageId } = req.params;
    const { feedback } = lodash.pick(req.body, ['feedback']);

    if (![GOOD_ANSWER, BAD_ANSWER].includes(feedback)) {
      return next(incorrectFeedback);
    }

    req.resources.feedback = feedback;
    req.resources.messageId = messageId;

    return next();
  } catch (err) {
    return next(err);
  }
}

function validateAddQuestion(req, res, next) {
  try {
    const { artefactId } = req.params;
    const { question } = lodash.pick(req.body, ['question']);

    if (!question) {
      return next(missingQuestion);
    }

    req.resources.artefactId = artefactId;
    req.resources.questionInfo = { query: question, history: [], answer_level: 'strict' };

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  validateAddQuestion,
  validateUpdateMessage
}
