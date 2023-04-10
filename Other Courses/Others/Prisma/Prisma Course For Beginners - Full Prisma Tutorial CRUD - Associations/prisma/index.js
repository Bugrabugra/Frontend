const express = require("express");
const app = express();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();
app.use(express.json());
const PORT = 3001;

// get all users
app.get("/user", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
});

// create user
app.post("/user", async (req, res) => {
  const newUser = req.body;
  const response = await prisma.user.create({data: newUser});
  return res.json(response);
});

// update user
app.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const response = await prisma.user.update({data, where: {id: parseInt(id)}});
  return res.json(response);
});

// delete user
app.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const response = await prisma.user.delete({where: {id: parseInt(id)}});
  return res.json(response);
});

// -----------------------
// get all houses
app.get("/house", async (req, res) => {
  const allHouses = await prisma.house.findMany({
    include: {
      owner: true,
      builtBy: true
    },
    orderBy: [
      {
        owner: {
          firstName: "desc"
        }
      }
    ],
    where: {
      wifiPassword: {
        not: null
      }
    }
  });
  return res.json(allHouses);
});

// get house
app.get("/house/:id", async (req, res) => {
  const id = req.params.id;
  const allHouses = await prisma.house.findMany({
    where: {
      id
    },
    include: {
      owner: true,
      builtBy: true
    }
  });
  return res.json(allHouses);
});

// create house
app.post("/house", async (req, res) => {
  const newHouse = req.body;
  const response = await prisma.house.create({data: newHouse});
  return res.json(response);
});

// update house
app.put("/house/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const response = await prisma.house.update({data, where: {id: id}});
  return res.json(response);
});

// delete house
app.delete("/house/:id", async (req, res) => {
  const id = req.params.id;
  const response = await prisma.house.delete({where: {id: id}});
  return res.json(response);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
