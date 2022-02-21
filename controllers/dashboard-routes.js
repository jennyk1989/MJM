const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Task } = require('../models');
const withAuth = require('../utils/auth');


// rendering user's tasks on the dashboard
router.get('/', withAuth, (req, res) => {
    Task.findAll({
        attributes: ['id','task_name'],
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktopost = data.map(task => task.get({plain: true}));
        res.render('dashboard', {
            tasktopost,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// rendering the update task page
router.get('/edit/:id', withAuth, (req, res) => {
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