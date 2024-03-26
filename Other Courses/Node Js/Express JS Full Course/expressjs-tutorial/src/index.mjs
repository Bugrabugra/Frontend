import express from "express";


const app = express();
const PORT = process.env.PORT || 3000;

const MOCK_USERS = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "adam", displayName: "Adam" },
  { id: 4, username: "tina", displayName: "Tine" },
  { id: 5, username: "jason", displayName: "Jason" },
  { id: 6, username: "henry", displayName: "Henry" },
  { id: 7, username: "marilyn", displayName: "Marilyn" }
]

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello, World" })
})

app.get("/api/users", (request, response) => {
  response.send(MOCK_USERS)
})

app.get("/api/users/:id", (request, response) => {
  const { id } = request.params

  const parsedId = parseInt(request.params.id)

  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad request" })
  }

  const foundUser = MOCK_USERS.find((user) => user.id === parsedId)

  if (!foundUser) {
    return response.sendStatus(404)
  }

  return response.send(foundUser)
})

app.get("/api/products", (request, response) => {
  response.send([
    { id: 123, name: "chicken breast", price: 12.99 }
  ])
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
