const router = require('express').Router();
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');


// rendering user's tasks on the dashboard
router.get('/', (req, res) => {
    Task.findAll({
        attributes: ['id','task_name'],
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktopost = data.map(task => task.get({plain: true}));
        res.render('dashboard', {tasktopost})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// rendering the update task page
router.get('/edit/:id', (req, res) => {
    Task.findOne({
        where: { 
            id: req.params.id 
        },
        attributes: ['id','task_name'],
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktoedit = data.get({plain: true});
        res.render('update-task', { tasktoedit });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;