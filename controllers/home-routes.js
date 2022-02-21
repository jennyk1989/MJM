const router = require('express').Router();
const { User, Task } = require('../models');
const sequelize = require('../config/connection');

//rendering the homepage 
router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/',  (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

//once user logs in, redirect them to the dashboard
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/dashboard');
        return; 
    }
});

module.exports = router;


