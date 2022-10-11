const express = require("express");
const notesController = require("../controllers/notesController");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();
router.use(verifyJWT);

router
  .route("/")
  .get(notesController.getAllNotes)
  .post(notesController.createNewNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote)

module.exports = router;
