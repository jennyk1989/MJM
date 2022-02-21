const router = require('express').Router();
const { User, Task } = require('../../models');
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

// api/users/id route to get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
          id: req.params.id
        },
        //include the user's tasks
        include: [
            {
                model: Task,
                attributes: ['id', 'task_name']
            }
        ]
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

//api/users posting route (creating a user)
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        req.session.save(() => { //initiate creation of the session
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;

            res.json(data); //store the data from the session
            });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.post('/login', (req,res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(data => {
        if (!data) {
            res.status(400).json({ message: 'No user with that username!'});
            return;
        }
        
        const validPassword = data.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
      
            res.json({ user: data, message: 'You are now logged in!' });
        });
    });
});

//destroy the session if user logs out
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//update users
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if (!data[0]) {
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

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
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

module.exports = router;




