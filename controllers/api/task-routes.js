const router = require('express').Router();
const { Category, Task } = require('../../models');


router.get('/', (req, res) => {

  Task.findAll({ 
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      }
    ]
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

