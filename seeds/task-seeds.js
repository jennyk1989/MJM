const { Task } = require('../models');

const taskData = [
  {
    task_name: 'Clean'
  },
  {
    task_name: 'Walk the dog'
  },
  {
    task_name: 'Check the mail'
  },
  {
    task_name: 'Paint kitchen'
  },
  {
    task_name: 'Fix gate'
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;