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

