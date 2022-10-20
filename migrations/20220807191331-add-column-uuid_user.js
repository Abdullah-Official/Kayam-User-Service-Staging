module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users', // table name
        'userUUID', // new field name
        {
          type: Sequelize.UUID,
          allowNull: false,
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('users', 'userUUID'),
    ]);
  },
};