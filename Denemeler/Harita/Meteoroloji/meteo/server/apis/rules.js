const db = require("../database/db");


// get rules
const getRules = (req, res) => {
  db.query(
    `select * from rules`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
};

// get specific rule
const getRule = (req, res) => {
  const id = req.params.id;
  db.query(
    `select * from rules where id = ${id}`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
};

// create rule
const createRule = async (req, res) => {
  const {source, min_value, max_value, warning_message, groups} = req.body;
  db.query(
    `insert into rules (source, min_value, max_value, warning_message, groups) 
     values ('${source}', ${min_value}, ${max_value}, '${warning_message}', 
     '${groups}') returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
};

// edit rule
const editRule = async (req, res) => {
  const {source, min_value, max_value, warning_message, groups} = req.body;
  const id = req.params.id;
  await db.query(
    `update rules set source = '${source}', min_value = ${min_value}, 
    max_value = ${max_value}, warning_message = '${warning_message}', 
    groups = '${groups}' where id = '${id}' returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
}

// delete rule
const deleteRule = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `delete from rules where id = ${id} returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
}

module.exports = {getRules, getRule, createRule, editRule, deleteRule};