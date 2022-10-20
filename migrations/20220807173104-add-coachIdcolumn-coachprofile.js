module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'coachprofiles', // table name
        'coachId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Coach ID is required',
            },
            notNull: {
              msg: 'Coach ID is required',
            },
          },
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('coachprofiles', 'coachId'),
    ]);
  },
};