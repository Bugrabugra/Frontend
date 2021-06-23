let items = require("../Items");
const {v4:uuidv4} = require("uuid");


const getItems = (req, reply) => {
  reply.send(items);
}

const getItem = (req, reply) => {
  const {id} = req.params;

  const item = items.find(item => {
    return item.id = id;
  })

  reply.send(item);
}

const addItem = (req, reply) => {
  const {name} = req.body;
  const item = {
    id: uuidv4(),
    name: name
  }

  items = [...items, item];

  reply.code(201).send(item);
}

const deleteItem = (req, reply) => {
  const {id} = req.params;

  items = items.filter(item => {
    return item.id !== id;
  });

  reply.send({message: `Item ${id} has been removed`})
}

const updateItem = (req, reply) => {
  const {id} = req.params;
  const {name} = req.body;

  items = items.map(item => {
    return item.id === id ? {id, name} : item;
  })

  const item = items.find(item => {
    return item.id === id;
  });

  reply.send(item)
}

module.exports = {
  getItem, getItems, addItem, deleteItem, updateItem
}

