const db = require("../database/db");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;


// get users
const getUsers = async (req, res) => {
  await db.query(
    `select * from users`,
    (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result.rows);
    }
  })
};

// get specific user
const getUser = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `select * from users where id = ${id}`,
    (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result.rows);
    }
  })
};

// create user
const createUser = async (req, res) => {
  const {
    username, password, email,
    phone_number, name, surname,
    admin, poi_responsibilities,
    warnings_to_receive
  } = req.body;
  // same email control
  await db.query(
    `select * from users where email = '${email}'`,
    (error, result) => {
      if (result.rows.length > 0) {
        res.json({error: "Aynı e-mail adresine sahip kullanıcı mevcuttur."});
      } else {
        // crypt the password
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            // store hash db
            db.query(`
              insert into users 
              (username, password, email, phone_number, name, 
              surname, admin, poi_responsibilities, warnings_to_receive) 
              values (
                '${username}', 
                '${hash}',
                '${email}', 
                '${phone_number}', 
                '${name}', 
                '${surname}',
                ${admin},
                array [${poi_responsibilities}],
                array [${warnings_to_receive}],
              ) returning id
            `, (error, result) => {
              if (error) {
                res.send(error);
              } else {
                res.json(result.rows);
              }
            })
          });
        });
      }
    })
};

// edit user
const editUser = async (req, res) => {
  const {
    username, password, email, phone_number,
    name, surname, admin, poi_responsibilities,
    warnings_to_receive
  } = req.body;
  console.log("POI: ", poi_responsibilities);
  const id = req.params.id;
  // crypt the password
  await bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        // store hash db
        db.query(`update users set username = '${username}', password = '${hash}', 
         email = '${email}', phone_number = '${phone_number}', name = '${name}', 
         surname = '${surname}', admin = ${admin}, 
         poi_responsibilities = array [${poi_responsibilities}],
         warnings_to_receive = array [${warnings_to_receive}] where id = ${id} returning id`,
          (error, result) => {
          if (error) {
            res.send(error);
          } else {
            res.json(result.rows);
          }
        })
      })
    })
}

// delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  await db.query(
    `delete from users where id = ${id} returning id`,
    (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result.rows);
    }
  })
}

module.exports = {getUsers, getUser, createUser, deleteUser, editUser};