const { user: User } = require("../models/index");
const jwt = require("jsonwebtoken");
const response = require("../helpers/response");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { forgotPasswordEmail } = require("../mailers/index");
const { Op } = require("sequelize");
const moment = require("moment");
const StreamChat = require("stream-chat").StreamChat;
const API_KEY = process.env.STREAM_API_KEY;
const SECRET_KEY = process.env.STREAM_SECRET_KEY;
const serverClient = StreamChat.getInstance(API_KEY, SECRET_KEY);
const { v4: uuidv4 } = require("uuid");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, accountType, mobileNumber } = req.body;
  const user_uuid = uuidv4();
  try {
    if (firstName && lastName && email &&  mobileNumber && password && accountType === "email") {
      User.findOne({ where: { email: req.body.email } })
        .then((user) => {
          if (!user) {
            User.create({
              firstName,
              lastName,
              email,
              password,
              mobileNumber,
              accountType,
              roleId: 2,
              userUUID: user_uuid,
              isOnBoarded: false,
            })
              .then((response) => {
                const token = jwt.sign(
                  {
                    id: response?.id,
                    email: response?.email,
                  },
                  process.env.JWT_SECRET || "test",
                 
                );
                return res.status(200).json({ success: true, response, token });
              })
              .catch((error) => {
                return response.sendBadRequest(res, error?.message);
              });
          } else {
            return response.sendBadRequest(res, {
              message: "User with this email already existed",
            });
          }
        })
        .catch((error) => {
          return response.sendBadRequest(res, error?.message);
        });
    } else {
      return response.sendBadRequest(
        res,
        "Please fill all required fields correctly."
      );
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    if (email && password) {
      User.findOne({ where: { email } }).then((user) => {
        if (user && user.accountType === "email") {
          const isPasswordCorrect = bcrypt.compareSync(
            password,
            user?.password
          );
          console.log(isPasswordCorrect);
          if (isPasswordCorrect) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
              },
              process.env.JWT_SECRET || "test",
             
            );
            return res.status(200).json({ success: true, token, user });
          } else {
            response.sendBadRequest(res, "Incorrect Password or email.");
          }
        } else {
          response.sendBadRequest(res, "No user exist with this email.");
        }
      });
    } else {
      return response.sendBadRequest(res, "Please fill all required fields.");
    }
  } catch (error) {
    return response.sendBadRequest(res, error);
  }
};

const socialAuth = async (req, res) => {
  const { email, firstName, lastName, profileImage, accountType, mobileNumber } = req.body;
  const user_uuid = uuidv4();
  const socialAuth = ["google", "apple"];
  try {
    try {
      User.findOne({ where: { email } }).then(async (user) => {
        if (user && socialAuth.includes(user.accountType)) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
            },
            process.env.JWT_SECRET || "test",
          );

          return res.status(200).json({ success: true, token, user });
        } else if (!user && socialAuth.includes(accountType)) {
          const userCreated = await User.create({
            firstName,
            lastName,
            email,
            profileImage,
            accountType,
            mobileNumber,
            roleId: 2,
            userUUID: user_uuid,
            isOnBoarded: false
          });
          if (userCreated) {
            const token = jwt.sign(
              {
                id: userCreated.id,
                email: userCreated.email,
              },
              process.env.JWT_SECRET || "test",
            );
            return res.status(200).json({
              success: true,
              user: userCreated,
              token,
              message: "User Created Successfully",
            });
          } else {
            return response.sendBadRequest(res, "User Can't Created");
          }
        } else {
          return response.sendBadRequest(
            res,
            "User email or account type is invalid"
          );
        }
      });
    } catch (error) {
      return response.sendServerError(res, error?.message);
    }
  } catch (error) {
    return response.sendServerError(res, error);
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            response.sendBadRequest(res, "This email is not registered");
          } else {
            crypto.randomBytes(20, (err, buffer) => {
              const token = buffer.toString("hex");
              user
                .update({
                  forgetPasswordToken: token,
                  tokenExpiration: Date.now() + 3600,
                })
                .then(() => {
                  const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;
                  forgotPasswordEmail(email, url);
                  res.json({
                    status: true,
                    message:
                      "We just sent you an email, Please follow the instructions in the email to access your account",
                  });
                });
            });
          }
        })
        .catch((error) => {
          response.sendBadRequest(res, error);
        });
    }
  } catch (error) {
    response.sendBadRequest(res, error);
  }
};

const resetPassword = async (req, res) => {
  // console.log(moment.diff(moment(), moment(user.tokenExpiration)))
  console.log(req.body.token, req.body.password)
  const user = await User.findOne({
    where: {
      forgetPasswordToken: req.body.token,
    },
  });
  
  if (user && moment().diff(user?.tokenExpiration, "seconds") < 3600) {
    user
      .update({
        password: req.body.password,
        forgetPasswordToken: null,
        tokenExpiration: null,
      })
      .then(async () => {
        res.json({
          success: true,
          message: "Password changed successfully",
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          message: error,
        });
      });
  } else {
    response.sendBadRequest(
      res,
      `${"Could not find User or Token has expired!"}`
    );
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  socialAuth,
};
