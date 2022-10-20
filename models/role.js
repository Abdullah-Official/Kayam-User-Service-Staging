module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define('role', {
      name: DataTypes.STRING,
    }, {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    }, {});
    return role;
  };
  
  