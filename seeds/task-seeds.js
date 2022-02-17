const { Task } = require('../models');

const taskData = [
  {
    task_name: 'Arm Day'
  },
  {
    task_name: 'Lego Day'
  },
  {
    task_name: 'Leg Day'
  },
  {
    task_name: 'Abs Day'
  },
  {
    task_name: 'Hay Day'
  },
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;