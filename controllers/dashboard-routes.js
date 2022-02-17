const router = require('express').Router();
const { User, Category, Task } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//rendering tasks in database
router.get('/', (req, res) => {
    Task.findAll({
        // where: {
        //     user_id: req.session.user_id
        // },
        attributes: [
            'task_name'
        ],
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

// adding a task


// creating custom task (body received from add-task.js)
router.post('/', (req, res) => {
    Task.create({
        task_name: req.body.task_name
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// removing a task 



module.exports = router;
