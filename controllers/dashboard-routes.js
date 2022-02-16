const router = require('express').Router();
const { User, Category, Task } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, (req, res) => {
    Category.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'category_text',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'task_text', 'category_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
    where: {
    id: req.params.id
    },
    attributes: ['id', 
                'category_text', 
                'title',
                'created_at'
            ],
    include: [
    {
        model: User,
        attributes: ['username']
    },
    {
        model: Comment,
        attributes: ['id', 'task_text', 'category_id', 'user_id', 'created_at'],
        include: {
        model: User,
        attributes: ['username']
        }
    }
    ]
})
    .then(dbPostData => {
    const post = dbPostData.get({ plain: true });
    res.render('edit-task', { Task , loggedIn: true }); 
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// rendering newpost page 
router.get('/newtask', (req, res) => {
  res.render('new-task');
});

module.exports = router;