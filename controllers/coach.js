const { user: User, coachprofiles: CoachProfiles, specialities: Specialities } = require("../models/index");
const response = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");

const createCoach = async (req, res) => {
  const { firstName, lastName, email, password, adminId, accountType } =
    req.body;
    const user_uuid = uuidv4();
  try {
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      adminId &&
      accountType === "email"
    ) {
      const admin = await User.findOne({ where: { id: adminId, roleId: 1 } });
      if (admin?.roleId === 1) {
        User.findOne({ where: { email } })
          .then((user) => {
            if (!user) {
              User.create({
                firstName,
                lastName,
                email,
                password,
                accountType,
                roleId: 3,
                AssignById: adminId,
                userUUID: user_uuid,
              isOnBoarded: false,
              })
                .then((coach) => {
                  return res.status(200).json({
                    success: true,
                    message: "Coach Created Successfully",
                    coach,
                  });
                })
                .catch((error) => {
                  return response.sendBadRequest(res, error?.message);
                });
            } else {
              return response.sendBadRequest(res, {
                message: "Coach with this email already existed",
              });
            }
          })
          .catch((error) => {
            return response.sendBadRequest(res, error?.message);
          });
      } else {
        return response.sendBadRequest(
          res,
          "Only Admin have rights to create a new coach."
        );
      }
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const getAllCoaches = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { roleId: 3 },
    });
    if (users?.length) {
      return res.status(200).json({ success: true, users });
    } else {
      return response.sendBadRequest(res, {
        message: "No Coaches Found!",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const getCoachProfileByCoachId = async (req, res) => {
  const {coachId} = req.body
  try {
    const coachProfile = await CoachProfiles.findOne({
      where: { coachId },
    });
    if (coachProfile) {
      return res.status(200).json({ success: true, coachProfile });
    } else {
      return response.sendBadRequest(res, {
        message: "No Coache Profile Found!",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const postCoachProfile = async (req, res) => {
  const { description, shortDescription, language, coachId } = req.body;
  try {
    const coach = await User.findOne({where: {id: coachId, roleId: 3}});
    if (coach && (description || shortDescription || language)) {
      if(coach?.coachProfileId === null){
        const coachProfile = await CoachProfiles.create({
          description,
          shortDescription,
          language,
          coachId,
        });
        if (coachProfile) {
          const updated = await User.update(
            {
              coachProfileId: coachProfile?.id
            },
            { where: {id: coachId} }
          );
          if(updated){
            return res.status(200).json({
              success: true,
              message: "Profile Created Successfully",
              coachProfile,
            });
          }else{
            response.sendBadRequest(res, "Can't update new Coach profile");
          }
        }else{
          response.sendBadRequest(res, "Can't Create Coach profile");
        }
      }else{
        response.sendBadRequest(res, "Profile already exist or Coach with this ID doesn't exist");
      }
    } else {
      return response.sendBadRequest(res, "Please fill at least one field or Enter valid coach id");
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const deleteCoachProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const coachprofile = await CoachProfiles.destroy({
      where: {
        id,
      },
      force: true,
    });
    if (coachprofile) {
      return res.status(200).json({ success: true, coachprofile });
    } else {
      return response.sendBadRequest(res, {
        message: "No coach profile exist with this ID",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};

const findAllCoachProfiles = async (req, res) => {
  try {
    const coachprofiles = await CoachProfiles.findAll();
    if (coachprofiles?.length) {
      return res.status(200).json({ success: true, coachprofiles });
    } else {
      return response.sendBadRequest(res, {
        message: "No coach profiles Found!",
      });
    }
  } catch (error) {
    console.log(error)
    return response.sendBadRequest(res, error?.message);
  }
};

const createCoachSpeciality = async (req,res) => {
  const {speciality, coachProfileId, coachId}  = req.body
  try {

    const coach = await User.findOne({where: {id: coachId, roleId: 3}});

    if(coach){
      const coachProfile = await CoachProfiles.findOne({where: {id: coachProfileId, coachId}});
      console.log(coachProfile)
    if(coachProfile){
      const spec = await Specialities.create({
        speciality, coachProfileId
      });
      if(spec){
        return res.status(200).json({
          success: true,
          message: "Coach Speciality Created Successfully",
          speciality: spec,
        });
      }else{
        response.sendBadRequest(res, "Can't create speciality");
      }
    }else{
      return response.sendBadRequest(res, {
        message: `No coach profile Found with the ID ${coachProfileId}!`,
      });
    }
    }
    else{
      return response.sendBadRequest(res, {
        message: `Only coach have rights to perform this action.`,
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
}

const findCoachSepcialities = async (req, res) => {
  const {coachProfileId} = req.body;
  try {
    const specialities = await Specialities.findAll({
      where: {coachProfileId}
    });
    if (specialities?.length) {
      return res.status(200).json({ success: true, specialities });
    } else {
      return response.sendBadRequest(res, {
        message: "No specialities Found!",
      });
    }
  } catch (error) {
    return response.sendBadRequest(res, error?.message);
  }
};


module.exports = {
  createCoach,
  getAllCoaches,
  postCoachProfile,
  deleteCoachProfile,
  findAllCoachProfiles,
  deleteCoachProfile,
  createCoachSpeciality,
  findCoachSepcialities,
  getCoachProfileByCoachId
};
