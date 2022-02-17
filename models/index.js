const Task = require('./Task');
const User = require('./User');

Task.belongsTo(User, { 
  foreignKey: 'user_id'
});

User.hasMany(Task, {
  foreignKey: 'user_id' 
});

module.exports = {
  Task,
  User,
};


