const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Workout',
  },
  {
    category_name: 'Clean',
  },
  {
    category_name: 'Eat',
  },
  {
    category_name: 'Send',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;