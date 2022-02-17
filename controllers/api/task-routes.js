const router = require('express').Router();
const { Task } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// get tasks
router.get('/', (req, res) => {
    Task.findAll({
        attributes: ['id','task_name'],
    })
    .then(dbTasks => {
        //first serialize the dbTasks data
        const tasktopost = dbTasks.map(task => task.get({plain: true}));
        res.render('dashboard', {tasktopost})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get a single task
router.get('/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'task_name']
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

// updating a task 
router.put('/:id', (req, res) => {
  Task.update({
    task_name: req.body.task_name
  },
  {
    where: {
      id: req.params.id,
    }
  })
  .then(taskdata => res.json(taskdata))
  .catch((err) => {
      res.status(500).json(err);
  });
});

// removing a task 
router.delete('/:id', (req,res) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    console.log(data);
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
  