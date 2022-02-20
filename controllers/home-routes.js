const router = require('express').Router();
const { User, Task } = require('../models');
const sequelize = require('../config/connection');


router.get('/',  (req, res) => {
    User.findAll({
        attributes: { exclude: ['[password']}
    })
    .then(res.render('homepage'))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    });
});

module.exports = router;


