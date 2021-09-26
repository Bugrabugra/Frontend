const db = require("../database/db");


// get rules
const getRules = (req, res) => {
  db.query(`
    select * 
    from users
    `,
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
  db.query(`
    select * 
    from users
    where id = ${id}
    `,
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
  const {username, password, email, phone_number, name, surname} = req.body;
  // same email control
  await db.query(
    `select * from users where email = '${email}'`,
    (error, result) => {
      if (result.rows.length > 0) {
        res.json({error: "Aynı e-mail adresine sahip kullanıcı mevcuttur."});
      } else {
        db.query(`
          insert into users 
          (username, password, email, phone_number, name, surname) 
          values (
            '${username}', 
            '${password}', 
            '${email}', 
            '${phone_number}', 
            '${name}', 
            '${surname}'
          ) returning id
        `,
          (error, result) => {
            if (error) {
              res.send(error);
            } else {
              res.send(result.rows);
            }
          })
      }
    })
};

// edit rule
const editRule = async (req, res) => {
  const {username, password, email, phone_number, name, surname} = req.body;
  const id = req.params.id;
  await db.query(`
    update users 
    set 
    username = '${username}', 
    password = '${password}', 
    email = '${email}', 
    phone_number = '${phone_number}', 
    name = '${name}', 
    surname = '${surname}'
    where id = '${id}'
    returning id
    `,
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
  await db.query(`
    delete from users 
    where id = ${id} 
    returning id
    `,
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.send(result.rows);
      }
    })
}

module.exports = {getRules, getRule, createRule, editRule, deleteRule};