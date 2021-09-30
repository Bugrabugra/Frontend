const db = require("../database/db");


// get all POI's
const getPOIs = async (req, res) => {
  await db.query(
    `select * from poi`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
};

module.exports = {getPOIs};