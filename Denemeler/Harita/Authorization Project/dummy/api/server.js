const express = require('express');


const app = express();
const port = 3001;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  if (user === "superadmin" && pass === "superadmin") {
    res.send({
      admin: [
        {Projects: ["project A", "project B"]},
        {Users: ["admin A", "admin B", "admin C"]},
        {Secret: ["code"]}
        ]
      ,
      user: [
        {Projects: ["project D"]},
        {Maps: ["map A", "map B"]}
      ]
    })
  } else {
    res.send("fail");
  }
})

app.listen(port);