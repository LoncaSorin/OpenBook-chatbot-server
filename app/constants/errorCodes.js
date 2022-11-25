const missingArtefactId = {
  message: 'Missing artefact id.',
  status: 422,
};

const incorrectFeedback = {
  message: 'The provided feedback is incorrect.',
  status: 422,
};

const missingQuestion = {
  message: 'Missing question',
  status: 422,
};

module.exports = {
  missingArtefactId,
  incorrectFeedback,
  missingQuestion,
}
