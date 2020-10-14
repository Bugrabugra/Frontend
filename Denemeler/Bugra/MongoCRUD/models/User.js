const happy = require("@hapi/joi");

const userSchema = happy.object({
  email: happy.string().trim().required(),
  password: happy.string().trim().required()
});

module.exports = userSchema;




