const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");
const user = require("../middlewares/user");
const auth = require("../middlewares/auth");

router.get("/", auth.verify, controller.getComment);
router.post("/", auth.verify, controller.postComment);
router.put("/:commentId", auth.verify, controller.putComment);
router.delete("/:commentId", auth.verify, controller.deleteComment);

module.exports = router;
