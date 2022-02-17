const Task = require('./Task');
const Category = require('./Category');

Task.belongsTo(Category, { 
  foreignKey: 'category_id'
});

Category.hasMany(Task, {
  foreignKey: 'category_id' 
});

module.exports = {
  Task,
  Category,
};

