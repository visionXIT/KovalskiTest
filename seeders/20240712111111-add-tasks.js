
module.exports = {
  async up ({context: queryInterface}) {
    return queryInterface.bulkInsert('Tasks', [
      {
        name: 'Task 1',
        timeInSeconds: 1,
      },
      {
        name: 'Task 2',
        timeInSeconds: 2,
      },
      {
        name: 'Task 3',
        timeInSeconds: 1,
      },
      {
        name: 'Task 4',
        timeInSeconds: 2,
      },
      {
        name: 'Task 5',
        timeInSeconds: 1,
      },
      {
        name: 'Task 6',
        timeInSeconds: 1,
      },
      {
        name: 'Task 7',
        timeInSeconds: 3,
      },
      {
        name: 'Task 8',
        timeInSeconds: 1,
      },
      {
        name: 'Task 9',
        timeInSeconds: 1,
      },
      {
        name: 'Task 10',
        timeInSeconds: 2,
      },

    ], {});
  },

  async down ({context: queryInterface}) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
