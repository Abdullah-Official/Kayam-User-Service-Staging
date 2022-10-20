module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('', 'name', {
              type: Sequelize.TEXT,
              allowNull: true,
          }, {
              transaction,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('', 'name', {
              type: Sequelize.STRING,
              allowNull: true,
          }, {
              transaction,
          })
      ])
  }
};