const express = require("express");
const messagesCtrl = require("./messagesController.js");
const { validateUpdateMessage, validateAddQuestion } = require("./messageValidation.js");

const router = express.Router();

router.get('/messages/:artefactId',
  messagesCtrl.getMessages);

router.put('/messages/:messageId',
  validateUpdateMessage,
  messagesCtrl.updateMessage);

router.post('/addQuestion/:artefactId',
  validateAddQuestion,
  messagesCtrl.addQuestion);

module.exports = router;
