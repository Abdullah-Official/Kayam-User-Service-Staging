const bcrypt = require('bcryptjs')



module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email',
        },
        notNull: {
          msg: 'Email is required',
        },
        notEmpty: {
          msg: 'Email is required',
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role is required',
        },
        notNull: {
          msg: 'Role is required',
        },
      },
    },
    coachId: {
      type: DataTypes.INTEGER,
    },
    coachProfileId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AssignById: {
      type: DataTypes.INTEGER,
    },

    mobileNumber: {
      type: DataTypes.STRING,
    },
    forgetPasswordToken: {
      type: DataTypes.STRING,
    },
    tokenExpiration: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.STRING
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    userUUID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    countryCode:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isOnBoarded: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    },

  }
  , {
    hooks: {
      // eslint-disable-next-line no-shadow
      beforeSave(user) {
        if (user.changed('password')) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        }
      },
    },
    
  });

  user.associate = function associate(models) {
    user.belongsTo(models.role, { foreignKey: 'roleId', as: 'role' });
    user.belongsTo(models.coachprofiles, { foreignKey: 'coachProfileId', as: 'coachprofiles' });
  };
  return user;
};