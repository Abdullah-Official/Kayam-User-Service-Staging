const express = require("express");
const {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  findUsersByRoleId,
  matchCoach,
  unMatchCoach,
  setOnboardedTrue,
} = require("../controllers/user");
const routes = express.Router();

routes.route("/").get(findAllUsers);
routes.route("/:id").get(findUserById);
routes.route("/role").post(findUsersByRoleId);
routes.route("/update").put(updateUser);
routes.route("/onboarded").put(setOnboardedTrue);
routes.route("/:id").delete(deleteUser);
routes.route("/match-coach").post(matchCoach);
routes.route("/unmatch-coach").post(unMatchCoach);

module.exports = routes;
