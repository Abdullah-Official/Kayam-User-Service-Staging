module.exports = {
  up: (queryInterface, Sequelize) => {
    const roles = ['admin','customer','coach'].map((name) => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('roles', roles, { ignoreDuplicates: true });
  },
};
