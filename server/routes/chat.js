const router = require("express").Router();
const { isAuth } = require("../middlewares/isAuth");
const {
  createChat,
  getAllChats,
  addConversation,
  getConversation,
  deleteChat
} = require("../controllers/chatControllers");

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);

module.exports = router;
