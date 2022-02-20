const router = require('express').Router();
const { User, Task } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');


//sending users to dash once logged in or signed up
 router.get('/users', (req, res) => {
     if(res.session.loggedIn) {
         res.redirect('/dashboard');
         return
     }
 })

// rendering user's tasks in database
router.get('/', withAuth, (req, res) => {
    Task.findAll({
        where: { user_id: req.session.user_id},
        attributes: ['id','task_name'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktopost = data.map(task => task.get({plain: true}));
        res.render('dashboard', {tasktopost, loggedIn: true })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// creating custom task (body received from add-task.js)
router.post('/', withAuth, (req, res) => {
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
router.put('/edit/:id', withAuth, (req, res) => {
    Task.update({
        where: { id: req.params.id },
        attributes: ['id','task_name'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(data => {
        //first serialize the dbTasks data
        const tasktoedit = data.get({plain: true});
        res.render('update-task', {tasktoedit, loggedIn: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// removing a task as done 
router.delete('/:id', withAuth, (req,res) => {
  Task.destroy({
    where: {
      id: req.params.id
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