const { getConnection } = require("../../../config/mysql");
const uuidv4 = require("uuid").v4;

async function createArtefact(req, res) {
  const id = uuidv4();
  const { artefactId } = req.resources;
  const connection = getConnection();

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
  }
}

module.exports.createArtefact = createArtefact;
