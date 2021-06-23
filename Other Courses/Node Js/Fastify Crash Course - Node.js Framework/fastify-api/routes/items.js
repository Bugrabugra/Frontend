const {getItems, getItem, addItem, deleteItem, updateItem} = require("../controllers/items");


// Item schema
const Item = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: {type: "string"},
  }
}

// Options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item
      }
    }
  },
  handler: getItems
}

// Options for single item
const getItemOpts = {
  schema: {
    response: {
      200: Item
    }
  },
  handler: getItem
}

// Options for adding item
const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: "string"}
      }
    },
    response: {
      201: Item
    }
  },
  handler: addItem
}

// Options for deleting single item
const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: {type: "string"}
        }
      }
    }
  },
  handler: deleteItem
}

// Options for updating single item
const updateItemOpts = {
  schema: {
    response: {
      200: Item
    }
  },
  handler: updateItem
}

const itemRoutes = (fastify, options, done) => {
  // Get all items
  fastify.get("/items", getItemsOpts);

  // Get single item
  fastify.get("/items/:id", getItemOpts);

  // Add item
  fastify.post("/items", postItemOpts);

  // Delete item
  fastify.delete("/items/:id", deleteItemOpts);

  // Update item
  fastify.put("/items/:id", updateItemOpts);

  done();
}

module.exports = itemRoutes;