const User = require("../../models/user");

module.exports = (router) => {
  router.get("/user/:id", (req, res) => {
    User.findById(req.params.id)
      .exec()
      .then(docs => {
        return res.status(200).json(docs);
      }).catch(err => {
        return res.status(500).json({
          message: "Error finding user!",
          error: err
        })
    })
  })

  router.get("/user/email/:email", (req, res) => {
    User.find({"email": req.params.email})
      .exec()
      .then(docs => {
        return res.status(200).json(docs);
      }).catch(err => {
      return res.status(500).json({
        message: "Error finding user!",
        error: err
      })
    })
  })

  router.post("/user", (req, res) => {
    let user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return console.log(err);
      }
      res.status(200).json(user);
    })
  })

  router.put("/user/:id", (req, res) => {
    console.log(req.body);
    let qry = {_id: req.params.id};
    let doc = {
      // first: req.body.firstName
      // last: req.body.lastName
      // email: req.body.email
      // password: req.body.password,
      isActive: req.body.isActive
    }

    console.log(doc);
    User.updateOne(qry, doc, (err, respRaw) => {
      if (err) {
        return console.log(err);
      }
      res.status(200).json(respRaw);
    })
  })
}