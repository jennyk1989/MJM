const router = require('express').Router();
const { User, Task } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


// get all tasks & send as res.json
router.get('/', (req, res) => {
    Task.findAll({
        where: { user_id: req.session.user_id},
        attributes: ['id','task_name'],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// get a single task by its id
router.get('/:id', (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'task_name'],
    // include: [
    //     {
    //         model: User,
    //         attributes: ['username']
    //     }
    // ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

// creating custom task (body received from add-task.js)
router.post('/', (req, res) => {
    Task.create({
        task_name: req.body.task_name,
        //user_id: req.session.user_id
    })
    .then(data => {
        console.log(data);
        res.json(data)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// update task
router.put('/:id', (req, res) => {
    Task.update({
        task_name: req.body.task_name
      },
      {
        where: {
          id: req.params.id
        }
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'no task found with this id'});
        }
        
        res.json(data);
        return Task.findall({ where: {id: req.params.id}});
    })
    .catch(err => {å
        console.log(err);
        res.status(500).json(err);
    })
});

// delete task
// router.delete('/', (req,res) => {
//     Task.destroy({
//         where: {
//             id: req.body.id
//         }
//     })
//     .then(data => {
//         if(!data) {
//             res.status(404).json({ message: 'no task found with this id'});
//         }
//         res.redirect('/dashboard')
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

// removing a task as done 
router.delete('/', (req,res) => {
  Task.destroy({
    where: {
        task_name: req.body.task_name,
        id: req.body.id
    }
  })
  .then(data => {
    if(!data) {
        res.status(404).json({ message: 'No task with this id'});
        return;
    }
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;