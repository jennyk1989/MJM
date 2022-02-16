const router = require('express').Router();
const { Model } = require('sequelize');
const { Category, Task } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Task,
      attributes: ['task_name']
    }
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Category.findOne ({
    where: {
      id: req.params.id 
    },
    include: {
      model: Task,
      attributes: ['category_id']
    }
  })
  .then(data => res.json(data))
  .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name
    })
    .then(data => res.json(data))
    .catch((err) => res.status(500).json(err));
  });
  
  router.put('/:id', (req, res) => {
    Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(data => res.json(data))
    .catch((err) => res.status(500).json(err));
  });
  
  router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => res.json(data))
    .catch((err) => res.status(500).json(err));
  });
  
  module.exports = router;
  