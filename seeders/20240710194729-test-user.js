
module.exports = {
  async up ({context: queryInterface}) {
    return queryInterface.bulkInsert('Users', [{
      name: 'Test',
      balance: 10000
    }], {});
  },

  async down ({context: queryInterface}) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
