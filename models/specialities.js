module.exports = (sequelize, DataTypes) => {
    const specialities = sequelize.define("specialities", {
      coachProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Coach Profile is required',
          },
          notNull: {
            msg: 'Coach Profile is required',
          },
        },
      },  
      speciality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    specialities.associate = function associate(models) {
      console.log(models)
      specialities.belongsTo(models.coachprofiles, {
        foreignKey: "coachProfileId",
        as: "coachprofiles",
      });
    };
    return specialities
  };