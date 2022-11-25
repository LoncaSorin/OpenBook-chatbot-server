const { formatRoute } = require("../../utils/formatters");
const request = require('request');
const { OPENBOOK_POST_QUESTION } = require("../../constants/openBook");
const { v4: uuidv4 } = require("uuid");
const { OPENBOOK_API_KEY } = require("../../../config/index.js");
const { GOOD_ANSWER } = require("../../constants/general");
const { getConnection } = require("../../../config/mysql");

async function getMessages(req, res) {
  const { artefactId } = req.params;
  const url = formatRoute(OPENBOOK_POST_QUESTION, { artefactId });
  const connection = getConnection();

  try {
    const query = 'SELECT * FROM messages';

    connection.query(query,function (error, results) {
      if (error) {
        throw error;
      }

      const arrayOfPromises = [];

      results.forEach((message) => {
        if (message?.feedback === GOOD_ANSWER) {
          const questionInfo = {
            query: message.question,
            history: [],
            answer_level: 'strict',
          }

          arrayOfPromises.push(
            new Promise(resolve => {
              request.post({
                  url,
                  body: questionInfo,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${OPENBOOK_API_KEY}`
                  },
                  json: true,
                },
                async (error, response, body) => {
                  const { statusCode } = response;
                  const { result } = body;
                  const hasDifferentAnswers = message.answer !== result?.answer;

                  if (!error && statusCode === 200) {
                    resolve({
                      ...message,
                      ...(hasDifferentAnswers ? { newAnswer: result?.answer } : {}),
                    });
                  } else {
                    throw error;
                  }
                })
            })
          );
        }
      })

      Promise.all(arrayOfPromises)
        .then((messages) => {
          const updatedResults = results.map((message) => {
            const foundMessage = messages.find((item) => item.id === message.id);

            return foundMessage ? foundMessage : message;
          });

          return res.send(updatedResults);
        })
        .catch((err) => {
          res.send({ status: 500, err })
        })
    });
  } catch (error) {
    res.send({ status: 500, error })
  }
}

async function updateMessage(req, res) {
  const { feedback, messageId } = req.resources;
  const connection = getConnection();

  try {
    const query = `UPDATE messages SET feedback = '${feedback}' WHERE id = '${messageId}'`;

    connection.query(query, function (error) {
      if (error) {
        throw error;
      }

      res.send({});
    });
  } catch (error) {
    res.send({ status: 500, error })
  }
}

async function addQuestion(req, res) {
  const { artefactId } = req.params;
  const { questionInfo } = req.resources;
  const id = uuidv4();
  const url = formatRoute(OPENBOOK_POST_QUESTION, { artefactId });
  const connection = getConnection();

  request.post({
    url,
    body: questionInfo,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${OPENBOOK_API_KEY}`
    },
    json: true,
  },
    async (error, response, body) => {
      const { statusCode } = response;

      if (!error && statusCode === 200) {
        const { result } = body;

        try {
          const query = `INSERT INTO messages (id, artefactId, question, answer) VALUES ('${id.toString()}', '${artefactId}', ${JSON.stringify(questionInfo?.query)}, ${JSON.stringify(result?.answer)})`;

          connection.query(query, function (error) {
            if (error) {
              throw error;
            }

            res.send({
              id: id.toString(),
              artefactId,
              question: questionInfo?.query,
              answer: result?.answer,
            })
          });
        } catch (err) {
          res.send({ status: 500, error: err })
        }
      } else {
        res.send({ status: 500, error })
      }
    })
}

module.exports  = {
  getMessages,
  updateMessage,
  addQuestion
}
