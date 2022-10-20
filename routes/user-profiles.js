const express = require("express");
const {
  findAllUserProfiles,
  findUserProfileByUserId,
  createUserProfile,
} = require("../controllers/user-profile");
const routes = express.Router();

routes.route("/").get(findAllUserProfiles);
routes.route("/id").post(findUserProfileByUserId);
routes.route("/").post(createUserProfile);

module.exports = routes;
