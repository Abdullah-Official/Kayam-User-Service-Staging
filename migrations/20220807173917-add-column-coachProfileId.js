module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'specialities', // table name
        'coachProfileId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Coach Profile ID is required',
            },
            notNull: {
              msg: 'Coach Profile ID is required',
            },
          },
        }
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('specialities', 'coachProfileId'),
    ]);
  },
};