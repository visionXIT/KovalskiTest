
module.exports = {
  async up ({context: queryInterface}) {
    return queryInterface.bulkInsert('Tasks', [
      {
        name: 'Task 1',
        timeInSeconds: 120,
      },
      {
        name: 'Task 2',
        timeInSeconds: 130,
      },
      {
        name: 'Task 3',
        timeInSeconds: 121
      },
      {
        name: 'Task 4',
        timeInSeconds: 123,
      },
      {
        name: 'Task 5',
        timeInSeconds: 128,
      },
      {
        name: 'Task 6',
        timeInSeconds: 120,
      },
      {
        name: 'Task 7',
        timeInSeconds: 120,
      },
      {
        name: 'Task 8',
        timeInSeconds: 124,
      },
      {
        name: 'Task 9',
        timeInSeconds: 121,
      },
      {
        name: 'Task 10',
        timeInSeconds: 122,
      },
      {
        name: 'Task 11',
        timeInSeconds: 124,
      },
      {
        name: 'Task 12',
        timeInSeconds: 122,
      },
      {
        name: 'Task 13',
        timeInSeconds: 120,
      },

    ], {});
  },

  async down ({context: queryInterface}) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
