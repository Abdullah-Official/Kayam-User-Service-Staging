const { user: User } = require("../models/index");
const response = require("../helpers/response");
const {
  getUserProfiles,
  getUserProfileByUserId,
  addOrUpdateProfile,
} = require("../services/dynamo");
const shortid = require("shortid");

const TABLE_NAME = process.env.USER_PROFILE_TABLE;

const findAllUserProfiles = async (req, res) => {
  const params = {
    TableName: TABLE_NAME,
  };
  try {
    const userProfiles = await getUserProfiles(params);
    if (userProfiles?.Items) {
      return res.status(200).json({ userProfiles });
    } else {
      return response.sendBadRequest(res, "No User Profiles Found!");
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const findUserProfileByUserId = async (req, res) => {
  const { userId } = req.body;
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId,
    },
  };
  try {
    const user = User.findOne({ where: { id: userId } });
    if (user) {
      const profile = await getUserProfileByUserId(params);
      if (profile?.Item) {
        return res.status(200).json({ profile });
      } else {
        return response.sendBadRequest(res, "No User Profile Found!");
      }
    } else {
      return response.sendBadRequest(res, "No User exist with the given ID!");
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const createUserProfile = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const params = {
    TableName: TABLE_NAME,
    Item: userData,
  };
  try {
    const user = User.findOne({ where: { id: userData?.userId } });
    if (user) {
      const profile = await addOrUpdateProfile(params);
      if (profile) {
        return res
          .status(200)
          .json({
            success: true,
            message: "Profile Created/Updated Successfully",
          });
      } else {
        return response.sendBadRequest(res, "Error in Creating Profile");
      }
    } else {
      return response.sendBadRequest(res, "No User exist with the given ID!");
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

module.exports = {
  findAllUserProfiles,
  findUserProfileByUserId,
  createUserProfile,
};
