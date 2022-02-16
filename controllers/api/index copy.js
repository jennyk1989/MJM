const router = require('express').Router();

const categoryRoutes = require('./category-routes');
const taskRoutes = require('./task-routes');
//const userRoutes = require('./user-routes');

router.use('/categories', categoryRoutes);
router.use('/task', taskRoutes);
//router.use = ('/users', userRoutes);

module.exports = router;
