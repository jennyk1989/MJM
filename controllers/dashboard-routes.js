const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


// rendering user's tasks in database
router.get('/', (req, res) => {
    Task.findAll({
        // where: { 
        //     user_id: req.session.user_id
        // },
        attributes: ['id','task_name'],
        // include: [
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktopost = data.map(task => task.get({plain: true}));
        //res.render('dashboard', { tasktopost, loggedIn: true })
        res.render('dashboard', {tasktopost})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
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
});

// update/delete task page
router.get('/edit/:id', (req, res) => {
    Task.findOne({
        where: { id: req.params.id },
        attributes: ['id','task_name']
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktoedit = data.get({plain: true});
        res.render('update-task', {tasktoedit})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// removing a task as done 
router.delete(':id', (req,res) => {
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