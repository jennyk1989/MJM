const router = require('express').Router();

const userRoutes = require('./user-routes');
const taskRoutes = require('./task-routes');

router.use('/users', userRoutes);
router.use('/edit', taskRoutes);

module.exports = router;
