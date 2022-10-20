
module.exports = (sequelize, DataTypes) => {
  const coachprofiles = sequelize.define('coachprofiles', {
    coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Coach ID is required',
        },
        notNull: {
          msg: 'Coach ID is required',
        },
      },
    },  
    description: {
        type: DataTypes.STRING,
         allowNull: true,
      },
      shortDescription: {
        type: DataTypes.STRING,
         allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
         allowNull: true,
      },
      specialityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

  });
  coachprofiles.associate = function associate(models) {
    coachprofiles.belongsTo(models.specialities, { foreignKey: 'specialityId', as: 'specialities',  });
    coachprofiles.hasOne(models.user, { foreignKey: 'coachProfileId', as: 'users', onDelete: 'cascade', hooks:true  });
  };

  return coachprofiles;
};
