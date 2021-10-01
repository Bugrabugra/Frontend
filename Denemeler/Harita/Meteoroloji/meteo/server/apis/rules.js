const db = require("../database/db");


// get rules
const getRules = async (req, res) => {
  await db.query(
    `select * from rules`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
};

// get specific rule
const getRule = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `select * from rules where id = ${id}`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

// create rule
const createRule = async (req, res) => {
  const {source, min_value, max_value, is_present} = req.body;
  await db.query(
    `insert into rules (source, min_value, max_value, is_present) 
         values ('${source}', ${min_value}, ${max_value}, ${is_present}) 
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
const editRule = async (req, res) => {
  const {source, min_value, max_value, is_present} = req.body;
  const id = req.params.id;
  await db.query(
    `update rules set source = '${source}', min_value = ${min_value}, 
         max_value = ${max_value}, is_present = ${is_present} where id = '${id}' 
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
const deleteRule = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `delete from rules where id = ${id} returning id`,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    })
}

module.exports = {getRules, getRule, createRule, editRule, deleteRule};