const express = require("express");
const router = express.Router();
const controller = require("../controllers/photo.controller");
const user = require("../middlewares/user");
const auth = require("../middlewares/auth");

router.get("/", auth.verify, controller.getPhoto);
router.post("/", auth.verify, controller.postPhoto);
// router.put("/:photoId", auth.verify, controller.putUser);
// router.delete("/:photoId", auth.verify, controller.deleteUser);

module.exports = router;
