const db = require("../database/db");


// get messages
const getWarnings = async (req, res) => {
  await db.query(
    `select * from warnings`,
    (error, result) => {
      console.log(error)
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
};

// get specific rule
const getWarning = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `select * from warnings where id = ${id}`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

// create rule
const createWarning = async (req, res) => {
  const {source, event, message, is_screen, is_field, rules} = req.body;
  await db.query(
    `insert into warnings (source, event, message, is_screen, is_field, rules) 
         values ('${source}', '${event}', '${message}', ${is_screen}, 
         ${is_field}, array [${rules}]) 
         returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

// edit rule
const editWarning = async (req, res) => {
  const {source, event, message, is_screen, is_field, rules} = req.body;
  console.log("RULE: ", rules)
  const id = req.params.id;
  await db.query(
    `update warnings set source = '${source}', event = '${event}', 
         message = '${message}', is_screen = ${is_screen}, 
         is_field = ${is_field}, rules = array [${rules}] where id = ${id}
         returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

// delete rule
const deleteWarning = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `delete from warnings where id = ${id} returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

module.exports = {
  getWarnings, getWarning, createWarning, editWarning, deleteWarning
};