const express = require("express");
const router = express.Router();
const controller = require("../controllers/socialmedia.controller");
const user = require("../middlewares/user");
const auth = require("../middlewares/auth");

router.get("/", auth.verify, controller.getSocialMedia);
router.post("/", auth.verify, controller.postSocialMedia);
router.put("/:socialmediaId", auth.verify, controller.putSocialMedia);
router.delete("/:socialmediaId", auth.verify, controller.deleteSocialMedia);

module.exports = router;
