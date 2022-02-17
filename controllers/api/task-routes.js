const router = require('express').Router();
const { Category, Task } = require('../../models');

// rendering tasks in database
router.get('/', (req, res) => {
    Task.findAll({
        // where: {
        //     user_id: req.session.user_id
        // },
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

// creating custom task (body received from add-task.js)
router.post('/', (req, res) => {
    Task.create({
        task_name: req.body.task_name
    })
    .then(data => {
        console.log(data);
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
  
  router.put('/:id', (req, res) => {
    Task.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then(taskdata => res.json(taskdata))
      .catch((err) => {
        res.status(400).json(err);
      });
  });

// removing a task 
router.delete('/:id', (req,res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
  