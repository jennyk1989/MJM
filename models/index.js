//routes and db schema
const User = require('./User');
const Days =  require('./Days');
const Tasks = require('./Tasks');


//Associatins between models

User.hasMany(Days, {
    foreignKey: 'user_id'
});

Days.belongsTo(User, {
    foreignKey: 'user_id'
});
Tasks.belongsTo(Days, {
    foreignKey: 'day_id',
    oneDelete: 'cascade',
    hooks: true
});
User.hasMany(Tasks, {
    foreignKey: "user_id",
    onDelete: 'cascade',
    hook: true
});
Days.hasMany(Tasks, {
    foreignkey: 'day_id',
    onDelet: 'cascade',
    hook: true
});

module.exports  = {User, Days, Tasks};