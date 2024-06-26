const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
const blogController = require("../Controller/blogController");
const authentication = require("../middleware/authentication");
const upload = require("../config/multerConfig");

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/updateuserdata", userController.updateUserData);
router.delete("/deleteuserdata", userController.deleteUserData);
router.get("/userdata", authentication, userController.getUserData);
// blog routes
router.get("/getblogdata", authentication, blogController.getBlogData);
router.post("/addblogdata", upload.single("image"), blogController.addBlogData);
router.delete("/deleteblogdata", blogController.deleteBlogData);
router.patch(
  "/updateblogdata",
  upload.single("image"),
  blogController.updateBlogData
);
//refresh
router.get("/refreshtoken", userController.refreshToken);

module.exports = router;
