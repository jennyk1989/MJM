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

router.get('/:id', (req, res) => {
    Task.findOne({
      where: {
        id: req.params.id
      },
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
  
  router.post('/', (req, res) => {
    Task.create(
      req.body
    )
    .then((taskdata) => res.status(200).json(taskdata))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });
  
 