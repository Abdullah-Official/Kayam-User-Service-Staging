module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        "users", // table name
        "isOnBoarded", // new field name
        {
          type: Sequelize.BOOLEAN,
          default: false,
          allowNull: false,
        }
      ),
      queryInterface.addColumn(
        "users", // table name
        "countryCode", // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn("users", "isOnBoarded"),
    queryInterface.removeColumn('users', 'countryCode')
  ]);
  },
};
