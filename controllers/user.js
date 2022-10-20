const { user: User, role: Role } = require("../models/index");
const response = require("../helpers/response");

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Role, required: true, as: "role" }],
    });
    if (users?.length) {
      return res.status(200).json({ success: true, users });
    } else {
      return response.sendBadRequest(res, {
        message: "No Users Found!",
      });
    }
  } catch (error) {
    console.log(error);
    return response.sendBadRequest(res, error?.message);
  }
};

const findUsersByRoleId = async (req, res) => {
  const { roleId } = req.body;
  try {
    const users = await User.findAll({
      where: { roleId },
      attributes: { exclude: ["password"] },
    });
    if (users?.length) {
      return res.status(200).json({ success: true, users });
    } else {
      return response.sendBadRequest(res, {
        message: `No ${
          roleId == 2 ? "Customers" : roleId == 3 ? "Coach" : "role"
        } Found!`,
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return response.sendBadRequest(res, {
        message: "No User exist with this ID",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const updateUser = async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    gender,
    profileImage,
    countryCode
  } = req.body;
  try {
    const user = await User.update(
      {
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        gender,
        profileImage,
        countryCode
      },
      { where: { id } }
    );
    if (user[0] == 1) {
      return res.status(200).json({ success: true, user });
    } else {
      return response.sendBadRequest(res, {
        message: "No User exist with this ID",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({
      where: {
        id,
      },
      force: true,
    });
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return response.sendBadRequest(res, {
        message: "No User exist with this ID",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error);
  }
};

const matchCoach = async (req, res) => {
  const { userId, coachId } = req.body;
  try {
    const coach = await User.findOne({
      where: { id: coachId, roleId: 3 },
    });
    const user = await User.findOne({
      where: { id: userId, roleId: 2 },
    });
    if (coach) {
      if (user?.coachId === null) {
        const user = await User.update(
          {
            coachId,
          },
          { where: { id: userId } }
        );
        if (user[0] == 1) {
          return res.status(200).json({ success: true, user, coachId: coach?.id });
        } else {
          return response.sendBadRequest(res, {
            message: "No User exist with this ID",
          });
        }
      } else {
        return response.sendBadRequest(
          res,
          "Please unmatch existing coach to match with new coach."
        );
      }
    } else {
      return response.sendBadRequest(res, "User or Coach doesn't exist");
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const unMatchCoach = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (user.roleId == 2) {
      if (user?.coachId !== null) {
        const user = await User.update(
          {
            coachId: null,
          },
          { where: { id: userId } }
        );
        if (user[0] == 1) {
          return res.status(200).json({ success: true, user });
        } else {
          console.log(user);
          return response.sendBadRequest(res, {
            message: "No User exist with this ID",
          });
        }
      } else {
        return response.sendBadRequest(res, "User doesn't have any coach.");
      }
    } else {
      return response.sendBadRequest(
        res,
        "This Operation is restricted to Customer Only."
      );
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const setOnboardedTrue = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.update(
      {
        isOnBoarded: true,
      },
      { where: { id: userId } }
    );
    console.log(user, " user");
    if (user[0] == 1) {
      return res
        .status(200)
        .json({
          success: true,
          user,
          message: "Set onboarded to true successfully",
        });
    } else {
      console.log(user);
      return response.sendBadRequest(res, {
        message: "No User exist with this ID",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  findUsersByRoleId,
  matchCoach,
  unMatchCoach,
  setOnboardedTrue,
};
