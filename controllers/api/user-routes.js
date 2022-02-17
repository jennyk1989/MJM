const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// api/users route
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

// api/users/id route
router.get(':id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
      })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//api/users posting route (sign up user)
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
    // req.session.save(() => {
    //     req.session.user_id = dbUserData.id;
    //     req.session.username = dbUserData.username;
    //     req.session.loggedIn = true;

    //     });
        res.json(dbUserData);
    });
});


module.exports = router;





