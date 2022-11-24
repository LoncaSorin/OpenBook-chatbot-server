const { closeMysql, initMysql } = require("../../../config/mysql.js");
const uuidv4 = require("uuid").v4;

async function createArtefact(req, res) {
  const connection = initMysql();
  const id = uuidv4();
  const { artefactId } = req.resources;

  try {
    const query = `INSERT INTO artefacts (id, artefactId) VALUES ('${id.toString()}', '${artefactId}')`;

    connection.query(query, function (error) {
      if (error) {
        throw error;
      }

      res.send({ artefactId, id });
    });
  } catch (error) {
    res.send({ status: 500, error })
  } finally {
    closeMysql(connection);
  }
}

module.exports.createArtefact = createArtefact;
